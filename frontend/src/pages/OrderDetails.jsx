import React, { useEffect, useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import Button from '../components/ui/Button'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import { useToast } from '../components/ui/ToastProvider'

import {

  fetchOrder,

  fetchOrderDetails,

  fetchOrderProducts,

  fetchOrderEmployees,

  updateOrder,

  updateOrderDetail,

  createOrderDetail,

  deleteOrderDetail,

} from '../api/orders'

import { getKlientId, klientRef, punonjesRef, recetaRef } from '../utils/entityRefs'

import { ACTIONS, DETAIL, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'
import { formatCurrency } from '../utils/formatCurrency'

const STATUS_OPTIONS = ['Ne proces', 'E perfunduar', 'Anuluar']



const formatDate = (value) => (value ? new Date(value).toLocaleDateString('en-GB') : '—')



export default function OrderDetailsPage() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { notify } = useToast()

  const [order, setOrder] = useState(null)

  const [items, setItems] = useState([])

  const [products, setProducts] = useState([])

  const [employees, setEmployees] = useState([])

  const [status, setStatus] = useState('Ne proces')

  const [dueDate, setDueDate] = useState('')

  const [loading, setLoading] = useState(true)

  const [saving, setSaving] = useState(false)

  const [error, setError] = useState(null)

  const [removedItems, setRemovedItems] = useState([])



  useEffect(() => {

    async function loadOrder() {

      try {

        setLoading(true)

        const [orderData, detailsData, productData, employeeData] = await Promise.all([

          fetchOrder(id),

          fetchOrderDetails(id),

          fetchOrderProducts(),

          fetchOrderEmployees(),

        ])



        setOrder(orderData)

        setStatus(orderData.statusi || 'Ne proces')

        setDueDate(orderData.dataGatshmerise || '')

        setItems(

          (detailsData || []).map((detail) => ({

            detajId: detail.detajId,

            produkti: detail.produkti ? { produktId: detail.produkti.produktId, emriProduktit: detail.produkti.emriProduktit } : null,

            lente: detail.lentet ? { lenteId: detail.lentet.lenteId, llojiLentes: detail.lentet.llojiLentes } : null,

            sasia: detail.sasia,

            cmimiNjesi: detail.cmimiNjesi,

          }))

        )

        setProducts(productData || [])

        setEmployees(employeeData || [])

      } catch (err) {

        setError(MESSAGES.loadError)

      } finally {

        setLoading(false)

      }

    }



    loadOrder()

  }, [id])



  const subtotal = useMemo(

    () => items.reduce((sum, item) => sum + ((Number(item.sasia) || 0) * (Number(item.cmimiNjesi) || 0)), 0),

    [items]

  )



  const setItem = (index, changes) => {

    setItems((current) => current.map((item, idx) => (idx === index ? { ...item, ...changes } : item)))

  }



  const addItem = () => {

    setItems((current) => [

      ...current,

      { detajId: null, produkti: null, lente: null, sasia: 1, cmimiNjesi: 0 },

    ])

  }



  const removeItem = (index) => {

    setItems((current) => {

      const removed = current[index]

      if (removed?.detajId) {

        setRemovedItems((existing) => [...existing, removed.detajId])

      }

      return current.filter((_, idx) => idx !== index)

    })

  }



  const updateProductSelection = (index, produktId) => {

    const product = products.find((item) => item.produktId === Number(produktId))

    setItem(index, {

      produkti: product ? { produktId: product.produktId, emriProduktit: product.emriProduktit } : null,

      lente: null,

      cmimiNjesi: product ? Number(product.cmimi) : 0,

    })

  }



  const handleSave = async () => {

    if (!order) return

    if (items.length === 0) {

      notify(DETAIL.addAtLeastOneItem, 'error')

      return

    }



    setSaving(true)

    try {

      const orderPayload = {

        klient: klientRef(order.klient?.id ?? getKlientId(order.klient)),

        receta: recetaRef(order.receta?.receteId),

        punonjesi: punonjesRef(order.punonjesi?.punonjesId),

        statusi: status,

        dataGatshmerise: dueDate || null,

        totali: subtotal,

      }



      await updateOrder(order.porosiId, orderPayload)



      await Promise.all(

        items.map(async (item) => {

          const payload = {

            sasia: Number(item.sasia),

            cmimiNjesi: Number(item.cmimiNjesi),

            porosia: { porosiId: order.porosiId },

          }



          if (item.produkti) {

            payload.produkti = { produktId: Number(item.produkti.produktId) }

          }

          if (item.lente) {

            payload.lentet = { lenteId: Number(item.lente.lenteId) }

          }



          if (item.detajId) {

            await updateOrderDetail(item.detajId, payload)

          } else {

            await createOrderDetail(payload)

          }

        })

      )



      await Promise.all(

        removedItems.map((detailId) => deleteOrderDetail(detailId))

      )



      notify(MESSAGES.saveSuccess)

      navigate(`/orders/${order.porosiId}`)

    } catch (err) {

      notify(MESSAGES.saveError, 'error')

    } finally {

      setSaving(false)

    }

  }



  if (loading) {

    return (

      <div className="p-6">

          <LoadingSpinner label={MESSAGES.loading} />

        </div>

    )

  }



  if (error) {

    return (

      <div className="p-6">

          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-card-md">{error}</div>

        </div>

    )

  }



  return (

    <div className="p-6 space-y-6">

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.porosite}</p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-900">{FIELD.order} #{order.porosiId}</h1>

              <p className="mt-2 text-sm text-slate-500">Shikoni dhe përditësoni statusin dhe artikujt e porosisë.</p>

            </div>

            <div className="flex flex-wrap gap-3">

              <Button type="button" className="bg-slate-900 hover:bg-slate-800" onClick={() => navigate('/orders')}>

                {ACTIONS.back}

              </Button>

              <Button type="button" className="bg-primary hover:bg-teal-600" onClick={handleSave} disabled={saving}>

                {saving ? ACTIONS.saving : ACTIONS.save}

              </Button>

            </div>

          </div>

        </div>



        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">

          <section className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.customer}</p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">{order.klient?.emri} {order.klient?.mbiemri}</p>

                  <p className="mt-1 text-sm text-slate-500">{order.klient?.email}</p>

                  <p className="mt-1 text-sm text-slate-500">{order.klient?.telefoni}</p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.prescription}</p>

                  <p className="mt-2 text-sm text-slate-900">{order.receta?.mjekuEmri ?? STATUS.noPrescription}</p>

                  <p className="mt-1 text-sm text-slate-500">{order.receta?.dataRecetes ? formatDate(order.receta.dataRecetes) : '—'}</p>

                </div>

              </div>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.orderStatus}</p>

                  <select

                    value={status}

                    onChange={(event) => setStatus(event.target.value)}

                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                  >

                    {STATUS_OPTIONS.map((option) => (

                      <option key={option} value={option}>

                        {option}

                      </option>

                    ))}

                  </select>

                </div>



                <div>

                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.deliveryDate}</p>

                  <input

                    type="date"

                    value={dueDate}

                    onChange={(event) => setDueDate(event.target.value)}

                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                  />

                </div>

              </div>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.items}</p>

                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{FIELD.items}</h2>

                </div>

                <button

                  type="button"

                  onClick={addItem}

                  className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"

                >

                  {ACTIONS.addItem}

                </button>

              </div>



              {items.length === 0 ? (

                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">

                  {DETAIL.noLineItems}

                </div>

              ) : (

                <div className="space-y-4">

                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">

                    <div className="grid gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-500 sm:grid-cols-[2fr_0.8fr_0.8fr_0.8fr_auto]">

                      <div>{FIELD.product}</div>

                      <div>{FIELD.qty}</div>

                      <div>{FIELD.price}</div>

                      <div>{FIELD.total}</div>

                      <div>{FIELD.action}</div>

                    </div>

                    {items.map((item, index) => (

                      <div key={index} className="grid gap-4 border-b border-slate-200 px-4 py-3 text-sm text-slate-700 sm:grid-cols-[2fr_0.8fr_0.8fr_0.8fr_auto]">

                        <div>

                          {item.produkti ? (

                            <div className="space-y-2">

                              <p className="font-medium text-slate-900">{item.produkti.emriProduktit}</p>

                              <select

                                value={item.produkti.produktId}

                                onChange={(event) => updateProductSelection(index, event.target.value)}

                                className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                              >

                                <option value="">{DETAIL.changeProduct}</option>

                                {products.map((product) => (

                                  <option key={product.produktId} value={product.produktId}>

                                    {product.emriProduktit}

                                  </option>

                                ))}

                              </select>

                            </div>

                          ) : item.lente ? (

                            <div className="space-y-2">

                              <p className="font-medium text-slate-900">{item.lente.llojiLentes}</p>

                              <p className="text-sm text-slate-500">{STATUS.lensItem}</p>

                            </div>

                          ) : (

                            <select

                              value=""

                              onChange={(event) => updateProductSelection(index, event.target.value)}

                              className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                            >

                              <option value="">{DETAIL.selectProduct}</option>

                              {products.map((product) => (

                                <option key={product.produktId} value={product.produktId}>

                                  {product.emriProduktit}

                                </option>

                              ))}

                            </select>

                          )}

                        </div>

                        <div>

                          <input

                            type="number"

                            min="1"

                            value={item.sasia}

                            onChange={(event) => setItem(index, { sasia: Number(event.target.value) })}

                            className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                          />

                        </div>

                        <div>

                          <input

                            type="number"

                            min="0"

                            step="0.01"

                            value={item.cmimiNjesi}

                            onChange={(event) => setItem(index, { cmimiNjesi: Number(event.target.value) })}

                            className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

                          />

                        </div>

                        <div className="flex items-center font-semibold text-slate-900">

                          {formatCurrency((Number(item.sasia) || 0) * (Number(item.cmimiNjesi) || 0))}

                        </div>

                        <div className="flex items-center justify-end">

                          <button

                            type="button"

                            onClick={() => removeItem(index)}

                            className="rounded-3xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"

                          >

                            {DETAIL.remove}

                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>

          </section>



          <aside className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.summary}</p>

              <div className="mt-6 space-y-4 text-sm text-slate-700">

                <div className="flex justify-between">

                  <span>{FIELD.subtotal}</span>

                  <span className="font-semibold">{formatCurrency(subtotal)}</span>

                </div>

                <div className="flex justify-between">

                  <span>{FIELD.taxEstimate}</span>

                  <span className="font-semibold">{formatCurrency(subtotal * 0.05)}</span>

                </div>

                <div className="flex justify-between text-base font-semibold text-slate-900">

                  <span>{FIELD.total}</span>

                  <span>{formatCurrency(subtotal * 1.05)}</span>

                </div>

              </div>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.orderMetadata}</p>

              <div className="mt-4 space-y-4 text-sm text-slate-700">

                <div>

                  <p className="font-medium text-slate-900">{FIELD.orderDate}</p>

                  <p>{formatDate(order.dataPorosise)}</p>

                </div>

                <div>

                  <p className="font-medium text-slate-900">{FIELD.customer}</p>

                  <p>{order.klient?.emri} {order.klient?.mbiemri}</p>

                </div>

                <div>

                  <p className="font-medium text-slate-900">{FIELD.employee}</p>

                  <p>{order.punonjesi?.emri} {order.punonjesi?.mbiemri}</p>

                </div>

                <div>

                  <p className="font-medium text-slate-900">{FIELD.status}</p>

                  <p>{status}</p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

  )

}


