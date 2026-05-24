import { useCallback, useEffect, useMemo, useState } from 'react';
import api from './api';

const entityGroups = [
  {
    name: 'Shitje',
    items: ['klientet', 'produktet', 'porosite', 'detajetPorosise', 'pagesat'],
  },
  {
    name: 'Optike',
    items: ['recetat', 'kontrolletSyve', 'rezervimet', 'lentet'],
  },
  {
    name: 'Operacione',
    items: ['inventari', 'furnitoret', 'dergesat', 'garancite', 'njoftimet', 'historikuVizitave', 'punonjesit', 'kategorite'],
  },
];

const entities = {
  klientet: {
    label: 'Klientet',
    singular: 'klient',
    endpoint: '/api/klientet',
    idKey: 'id',
    subtitle: 'Kartela klientesh, kontaktet dhe data e regjistrimit.',
    columns: ['emri', 'mbiemri', 'email', 'telefoni', 'dataRegjistrimit'],
    fields: [
      { name: 'emri', label: 'Emri', required: true },
      { name: 'mbiemri', label: 'Mbiemri', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telefoni', label: 'Telefoni' },
      { name: 'dataLindjes', label: 'Data e lindjes', type: 'date' },
      { name: 'adresa', label: 'Adresa', span: true },
    ],
  },
  produktet: {
    label: 'Produktet',
    singular: 'produkt',
    endpoint: '/api/produktet',
    idKey: 'produktId',
    subtitle: 'Syze, korniza dhe produkte sipas kategorive.',
    columns: ['emriProduktit', 'marka', 'modeli', 'cmimi', 'sasiaStok', 'aktiv'],
    fields: [
      { name: 'kategori', label: 'Kategori ID', relationKey: 'kategoriId', type: 'number', required: true },
      { name: 'emriProduktit', label: 'Emri i produktit', required: true },
      { name: 'marka', label: 'Marka' },
      { name: 'modeli', label: 'Modeli' },
      { name: 'cmimi', label: 'Cmimi', type: 'number', step: '0.01', required: true },
      { name: 'sasiaStok', label: 'Sasia stok', type: 'number', required: true },
      { name: 'ngjyra', label: 'Ngjyra' },
      { name: 'materiali', label: 'Materiali' },
      { name: 'aktiv', label: 'Aktiv', type: 'checkbox' },
    ],
  },
  kategorite: {
    label: 'Kategorite',
    singular: 'kategori',
    endpoint: '/api/kategorite',
    idKey: 'kategoriId',
    subtitle: 'Kategorite qe organizojne produktet.',
    columns: ['emriKategorise', 'pershkrimi', 'aktive'],
    fields: [
      { name: 'emriKategorise', label: 'Emri i kategorise', required: true },
      { name: 'pershkrimi', label: 'Pershkrimi', span: true },
      { name: 'aktive', label: 'Aktive', type: 'checkbox' },
    ],
  },
  porosite: {
    label: 'Porosite',
    singular: 'porosi',
    endpoint: '/api/porosite',
    idKey: 'porosiId',
    subtitle: 'Porosi klientesh me recete, punonjes dhe status.',
    columns: ['klient', 'receta', 'punonjesi', 'totali', 'statusi', 'dataGatshmerise'],
    fields: [
      { name: 'klient', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'receta', label: 'Recete ID', relationKey: 'receteId', type: 'number', required: true },
      { name: 'punonjesi', label: 'Punonjes ID', relationKey: 'punonjesId', type: 'number', required: true },
      { name: 'totali', label: 'Totali', type: 'number', step: '0.01' },
      { name: 'statusi', label: 'Statusi' },
      { name: 'dataGatshmerise', label: 'Data e gatshmerise', type: 'date' },
    ],
  },
  detajetPorosise: {
    label: 'Detajet e porosise',
    singular: 'detaj',
    endpoint: '/api/detajet-porosise',
    idKey: 'detajId',
    subtitle: 'Rreshtat e porosise me produkt ose lente.',
    columns: ['porosia', 'produkti', 'lentet', 'sasia', 'cmimiNjesi', 'nentotali'],
    fields: [
      { name: 'porosia', label: 'Porosi ID', relationKey: 'porosiId', type: 'number', required: true },
      { name: 'produkti', label: 'Produkt ID', relationKey: 'produktId', type: 'number' },
      { name: 'lentet', label: 'Lente ID', relationKey: 'lenteId', type: 'number' },
      { name: 'sasia', label: 'Sasia', type: 'number', required: true },
      { name: 'cmimiNjesi', label: 'Cmimi njesi', type: 'number', step: '0.01', required: true },
    ],
  },
  pagesat: {
    label: 'Pagesat',
    singular: 'pagese',
    endpoint: '/api/pagesat',
    idKey: 'id',
    subtitle: 'Pagesa per porosi dhe statusi financiar.',
    columns: ['porosia', 'shuma', 'metodaPageses', 'statusi', 'dataPageses'],
    fields: [
      { name: 'porosia', label: 'Porosi ID', relationKey: 'porosiId', type: 'number', required: true },
      { name: 'shuma', label: 'Shuma', type: 'number', step: '0.01', required: true },
      { name: 'metodaPageses', label: 'Metoda' },
      { name: 'statusi', label: 'Statusi' },
    ],
  },
  recetat: {
    label: 'Recetat',
    singular: 'recete',
    endpoint: '/api/recetat',
    idKey: 'receteId',
    subtitle: 'Receta optike, dioptria dhe shenimet klinike.',
    columns: ['klient', 'mjekuEmri', 'dataRecetes', 'syriDjathteSfera', 'syriMajteSfera', 'distancaPupilare'],
    fields: [
      { name: 'klient', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'mjekuEmri', label: 'Mjeku' },
      { name: 'dataRecetes', label: 'Data e recetes', type: 'date' },
      { name: 'syriDjathteSfera', label: 'Syri djathte sfera', type: 'number', step: '0.25' },
      { name: 'syriDjathteCilindri', label: 'Syri djathte cilindri', type: 'number', step: '0.25' },
      { name: 'syriMajteSfera', label: 'Syri majte sfera', type: 'number', step: '0.25' },
      { name: 'syriMajteCilindri', label: 'Syri majte cilindri', type: 'number', step: '0.25' },
      { name: 'distancaPupilare', label: 'Distanca pupilare', type: 'number', step: '0.1' },
      { name: 'shenimet', label: 'Shenimet', textarea: true, span: true },
    ],
  },
  kontrolletSyve: {
    label: 'Kontrollet e syve',
    singular: 'kontroll',
    endpoint: '/api/kontrolletsyve',
    idKey: 'kontrollId',
    subtitle: 'Kontrolle, rezultate dhe rekomandime.',
    columns: ['klient', 'punonjesi', 'receteId', 'dataKontrollit', 'rezultati', 'rekomandimi'],
    fields: [
      { name: 'klient', label: 'Klient ID', relationKey: 'id', type: 'number' },
      { name: 'punonjesi', label: 'Punonjes ID', relationKey: 'punonjesId', type: 'number' },
      { name: 'receteId', label: 'Recete ID', type: 'number' },
      { name: 'dataKontrollit', label: 'Data e kontrollit', type: 'date' },
      { name: 'rezultati', label: 'Rezultati', span: true },
      { name: 'rekomandimi', label: 'Rekomandimi', span: true },
    ],
  },
  rezervimet: {
    label: 'Rezervimet',
    singular: 'rezervim',
    endpoint: '/api/rezervimet',
    idKey: 'rezervimId',
    subtitle: 'Terminot per kliente dhe punonjes.',
    columns: ['klienti', 'punonjesi', 'dataRezervimit', 'oraRezervimit', 'statusi'],
    fields: [
      { name: 'klienti', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'punonjesi', label: 'Punonjes ID', relationKey: 'punonjesId', type: 'number', required: true },
      { name: 'dataRezervimit', label: 'Data', type: 'date', required: true },
      { name: 'oraRezervimit', label: 'Ora', type: 'time', required: true },
      { name: 'statusi', label: 'Statusi' },
      { name: 'shenime', label: 'Shenime', span: true },
    ],
  },
  lentet: {
    label: 'Lentet',
    singular: 'lente',
    endpoint: '/api/lentet',
    idKey: 'lenteId',
    subtitle: 'Llojet e lenteve, cmime dhe stok.',
    columns: ['llojiLentes', 'prodhuesi', 'indeksi', 'veshja', 'cmimi', 'sasiaStok'],
    fields: [
      { name: 'llojiLentes', label: 'Lloji i lentes', required: true },
      { name: 'prodhuesi', label: 'Prodhuesi' },
      { name: 'indeksi', label: 'Indeksi' },
      { name: 'veshja', label: 'Veshja' },
      { name: 'cmimi', label: 'Cmimi', type: 'number', step: '0.01' },
      { name: 'sasiaStok', label: 'Sasia stok', type: 'number' },
    ],
  },
  inventari: {
    label: 'Inventari',
    singular: 'inventar',
    endpoint: '/api/inventari',
    idKey: 'inventarId',
    subtitle: 'Nivele stoku dhe pragje minimale.',
    columns: ['produkt', 'sasiaAktuale', 'sasiaMinimale', 'dataPerditesimit'],
    fields: [
      { name: 'produkt', label: 'Produkt ID', relationKey: 'produktId', type: 'number', required: true },
      { name: 'sasiaAktuale', label: 'Sasia aktuale', type: 'number' },
      { name: 'sasiaMinimale', label: 'Sasia minimale', type: 'number' },
    ],
  },
  furnitoret: {
    label: 'Furnitoret',
    singular: 'furnitor',
    endpoint: '/api/furnitoret',
    idKey: 'furnitorId',
    subtitle: 'Partneret furnizues dhe kontaktet.',
    columns: ['emriKompanise', 'personiKontaktit', 'email', 'telefoni', 'produktetFurnizuara'],
    fields: [
      { name: 'emriKompanise', label: 'Emri i kompanise', required: true },
      { name: 'personiKontaktit', label: 'Personi kontaktit' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telefoni', label: 'Telefoni' },
      { name: 'produktetFurnizuara', label: 'Produktet e furnizuara', span: true },
    ],
  },
  dergesat: {
    label: 'Dergesat',
    singular: 'dergese',
    endpoint: '/api/dergesat',
    idKey: 'dergesaId',
    subtitle: 'Transporti dhe gjurmimi i porosive.',
    columns: ['porosia', 'kompaniaTransportit', 'numriGjurmimit', 'adresaDergeses', 'statusiDergeses'],
    fields: [
      { name: 'porosia', label: 'Porosi ID', relationKey: 'porosiId', type: 'number', required: true },
      { name: 'kompaniaTransportit', label: 'Kompania transportit' },
      { name: 'numriGjurmimit', label: 'Numri gjurmimit' },
      { name: 'adresaDergeses', label: 'Adresa e dergeses', required: true, span: true },
      { name: 'dataNisjes', label: 'Data nisjes', type: 'date' },
      { name: 'dataArritjes', label: 'Data arritjes', type: 'date' },
      { name: 'statusiDergeses', label: 'Statusi' },
    ],
  },
  garancite: {
    label: 'Garancite',
    singular: 'garanci',
    endpoint: '/api/garancite',
    idKey: 'garanciaId',
    subtitle: 'Garanci per produkte, lente dhe porosi.',
    columns: ['klienti', 'porosia', 'produkti', 'lentet', 'dataFillimit', 'dataSkadimit'],
    fields: [
      { name: 'porosia', label: 'Porosi ID', relationKey: 'porosiId', type: 'number', required: true },
      { name: 'klienti', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'produkti', label: 'Produkt ID', relationKey: 'produktId', type: 'number' },
      { name: 'lentet', label: 'Lente ID', relationKey: 'lenteId', type: 'number' },
      { name: 'dataFillimit', label: 'Data fillimit', type: 'date', required: true },
      { name: 'dataSkadimit', label: 'Data skadimit', type: 'date', required: true },
      { name: 'kushtet', label: 'Kushtet', textarea: true, span: true, required: true },
    ],
  },
  njoftimet: {
    label: 'Njoftimet',
    singular: 'njoftim',
    endpoint: '/api/njoftimet',
    idKey: 'njoftimId',
    subtitle: 'Mesazhe per kliente dhe gjendja e leximit.',
    columns: ['klienti', 'mesazhi', 'lexuar', 'dataKrijimit'],
    fields: [
      { name: 'klienti', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'mesazhi', label: 'Mesazhi', required: true, span: true },
      { name: 'lexuar', label: 'Lexuar', type: 'checkbox' },
    ],
  },
  historikuVizitave: {
    label: 'Historiku i vizitave',
    singular: 'historik',
    endpoint: '/api/historiku-vizitave',
    idKey: 'historikuId',
    subtitle: 'Historiku i vizitave dhe rekomandimeve.',
    columns: ['klienti', 'kontrolli', 'dataVizites', 'pershkrimi', 'rekomandimi'],
    fields: [
      { name: 'klienti', label: 'Klient ID', relationKey: 'id', type: 'number', required: true },
      { name: 'kontrolli', label: 'Kontroll ID', relationKey: 'kontrollId', type: 'number' },
      { name: 'dataVizites', label: 'Data e vizites', type: 'date' },
      { name: 'pershkrimi', label: 'Pershkrimi', span: true },
      { name: 'rekomandimi', label: 'Rekomandimi', span: true },
    ],
  },
  punonjesit: {
    label: 'Punonjesit',
    singular: 'punonjes',
    endpoint: '/api/punonjesit',
    idKey: 'punonjesId',
    subtitle: 'Stafi, rolet dhe kontaktet.',
    columns: ['emri', 'mbiemri', 'roli', 'email', 'telefoni', 'aktiv'],
    fields: [
      { name: 'emri', label: 'Emri', required: true },
      { name: 'mbiemri', label: 'Mbiemri', required: true },
      { name: 'roli', label: 'Roli' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telefoni', label: 'Telefoni' },
      { name: 'aktiv', label: 'Aktiv', type: 'checkbox' },
    ],
  },
};

const dashboardCards = [
  { key: 'klientet', label: 'Kliente', tone: 'bg-cyan-500' },
  { key: 'porosite', label: 'Porosi', tone: 'bg-emerald-500' },
  { key: 'produktet', label: 'Produkte', tone: 'bg-amber-500' },
  { key: 'rezervimet', label: 'Rezervime', tone: 'bg-rose-500' },
];

function emptyForm(config) {
  return config.fields.reduce((values, field) => {
    values[field.name] = field.type === 'checkbox' ? false : '';
    return values;
  }, {});
}

function valueFromRecord(record, field) {
  if (!record) return field.type === 'checkbox' ? false : '';
  const value = record[field.name];
  if (field.relationKey) return value?.[field.relationKey] ?? '';
  if (field.type === 'checkbox') return Boolean(value);
  return value ?? '';
}

function buildPayload(config, form) {
  return config.fields.reduce((payload, field) => {
    const rawValue = form[field.name];

    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(rawValue);
      return payload;
    }

    if (rawValue === '' || rawValue === null || rawValue === undefined) {
      return payload;
    }

    if (field.relationKey) {
      payload[field.name] = { [field.relationKey]: Number(rawValue) };
      return payload;
    }

    if (field.type === 'number') {
      payload[field.name] = Number(rawValue);
      return payload;
    }

    payload[field.name] = rawValue;
    return payload;
  }, {});
}

function displayValue(value) {
  if (value === true) return 'Po';
  if (value === false) return 'Jo';
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'object') {
    return value.emriProduktit || value.emriKategorise || value.emriKompanise || [value.emri, value.mbiemri].filter(Boolean).join(' ') || value.id || value.produktId || value.porosiId || value.receteId || value.punonjesId || value.lenteId || value.kontrollId || '-';
  }
  return String(value);
}

function App() {
  const [activeKey, setActiveKey] = useState('klientet');
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm(entities.klientet));
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [tokenReady, setTokenReady] = useState(Boolean(localStorage.getItem('token')));

  const config = entities[activeKey];
  const activeRecords = useMemo(() => records[activeKey] || [], [activeKey, records]);

  const filteredRecords = useMemo(() => {
    const search = query.toLowerCase().trim();
    if (!search) return activeRecords;
    return activeRecords.filter((record) =>
      JSON.stringify(record).toLowerCase().includes(search),
    );
  }, [activeRecords, query]);

  const stats = useMemo(() => {
    return dashboardCards.map((card) => ({
      ...card,
      value: records[card.key]?.length ?? 0,
    }));
  }, [records]);

  const loadEntity = useCallback(async (key = activeKey, silent = false) => {
    if (!silent) {
      setLoading(true);
      setError('');
    }

    try {
      const response = await api.get(entities[key].endpoint);
      const data = Array.isArray(response.data) ? response.data : [];
      setRecords((current) => ({ ...current, [key]: data }));
    } catch (err) {
      if (!silent) setError(readError(err));
    } finally {
      if (!silent) setLoading(false);
    }
  }, [activeKey]);

  useEffect(() => {
    Promise.resolve().then(() => loadEntity(activeKey));
  }, [activeKey, loadEntity]);

  useEffect(() => {
    Promise.resolve().then(() => {
      dashboardCards.forEach((card) => loadEntity(card.key, true));
    });
  }, [loadEntity]);

  function selectEntity(key) {
    setActiveKey(key);
    setForm(emptyForm(entities[key]));
    setEditing(null);
    setQuery('');
    setSuccess('');
    setError('');
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/api/auth/login', credentials);
      const token = response.data?.token || response.data?.accessToken || response.data?.jwt;
      if (!token) throw new Error('Login succeeded, but no JWT token was returned.');
      localStorage.setItem('token', token);
      setTokenReady(true);
      setSuccess('U kyce me sukses. Kerkesat tani dergojne JWT token.');
      loadEntity(activeKey);
    } catch (err) {
      setError(readError(err));
    }
  }

  function startCreate() {
    setEditing(null);
    setForm(emptyForm(config));
    setSuccess('');
    setError('');
  }

  function startEdit(record) {
    setEditing(record);
    setSuccess('');
    setError('');
    setForm(
      config.fields.reduce((values, field) => {
        values[field.name] = valueFromRecord(record, field);
        return values;
      }, {}),
    );
  }

  async function saveRecord(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload = buildPayload(config, form);
      if (editing) {
        await api.put(`${config.endpoint}/${editing[config.idKey]}`, {
          ...editing,
          ...payload,
          [config.idKey]: editing[config.idKey],
        });
        setSuccess(`${config.label} u perditesua.`);
      } else {
        await api.post(config.endpoint, payload);
        setSuccess(`${config.label} u shtua.`);
      }
      startCreate();
      await loadEntity(activeKey);
    } catch (err) {
      setError(readError(err));
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord(record) {
    const id = record[config.idKey];
    if (!window.confirm(`A deshiron ta fshish ${config.singular} #${id}?`)) return;
    setError('');
    setSuccess('');

    try {
      await api.delete(`${config.endpoint}/${id}`);
      setSuccess(`${config.label} u fshi.`);
      await loadEntity(activeKey);
    } catch (err) {
      setError(readError(err));
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-slate-900/90 p-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-400 text-lg font-black text-slate-950">DO</div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Dyqani Optikes</p>
              <h1 className="text-xl font-semibold text-white">Paneli</h1>
            </div>
          </div>

          <nav className="space-y-6">
            {entityGroups.map((group) => (
              <section key={group.name}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{group.name}</p>
                <div className="space-y-1">
                  {group.items.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectEntity(key)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                        activeKey === key
                          ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/40'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{entities[key].label}</span>
                      <span className="text-xs opacity-70">{records[key]?.length ?? '-'}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </aside>

        <section className="flex-1 overflow-hidden">
          <header className="border-b border-white/10 bg-slate-950 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-200">Sistem menaxhimi per dyqan optike</p>
                <h2 className="mt-1 text-3xl font-bold text-white">{config.label}</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">{config.subtitle}</p>
              </div>
              <form onSubmit={handleLogin} className="grid gap-2 rounded-lg border border-white/10 bg-white/5 p-3 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  value={credentials.username}
                  onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))}
                  className="h-10 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-cyan-300"
                  placeholder="Username"
                />
                <input
                  value={credentials.password}
                  onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                  className="h-10 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-cyan-300"
                  placeholder="Password"
                  type="password"
                />
                <button className="h-10 rounded-md bg-white px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-100" type="submit">
                  {tokenReady ? 'Rifresko' : 'Kycu'}
                </button>
              </form>
            </div>
          </header>

          <div className="space-y-6 overflow-y-auto p-5 sm:p-8">
            <section className="grid gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.key} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className={`mb-4 h-1.5 w-16 rounded-full ${stat.tone}`} />
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </section>

            {(error || success) && (
              <div className={`rounded-md border px-4 py-3 text-sm ${error ? 'border-rose-400/40 bg-rose-500/10 text-rose-100' : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'}`}>
                {error || success}
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Lista</h3>
                    <p className="text-sm text-slate-400">{filteredRecords.length} nga {activeRecords.length} rekorde</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="h-10 w-full rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-cyan-300 md:w-64"
                      placeholder="Kerko..."
                    />
                    <button onClick={() => loadEntity(activeKey)} className="h-10 rounded-md border border-white/10 px-4 text-sm font-semibold text-white hover:bg-white/10" type="button">
                      Rifresko
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        {config.columns.map((column) => (
                          <th key={column} className="px-4 py-3">{column}</th>
                        ))}
                        <th className="px-4 py-3 text-right">Veprime</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {loading ? (
                        <tr>
                          <td colSpan={config.columns.length + 2} className="px-4 py-10 text-center text-slate-400">Duke ngarkuar...</td>
                        </tr>
                      ) : filteredRecords.length ? (
                        filteredRecords.map((record) => (
                          <tr key={record[config.idKey]} className="hover:bg-white/[0.03]">
                            <td className="px-4 py-3 font-semibold text-cyan-200">{record[config.idKey]}</td>
                            {config.columns.map((column) => (
                              <td key={column} className="max-w-[220px] truncate px-4 py-3 text-slate-300">{displayValue(record[column])}</td>
                            ))}
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => startEdit(record)} className="rounded-md border border-cyan-300/30 px-3 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/10" type="button">Edito</button>
                                <button onClick={() => deleteRecord(record)} className="rounded-md border border-rose-300/30 px-3 py-1.5 text-xs font-semibold text-rose-100 hover:bg-rose-400/10" type="button">Fshi</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={config.columns.length + 2} className="px-4 py-10 text-center text-slate-400">Nuk ka rekorde per kete pamje.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-lg border border-white/10 bg-slate-900 p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{editing ? `Edito ${config.singular}` : `Shto ${config.singular}`}</h3>
                    <p className="mt-1 text-sm text-slate-400">Fushat me ID lidhen me objektet ne backend.</p>
                  </div>
                  <button onClick={startCreate} className="rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10" type="button">
                    Pastro
                  </button>
                </div>

                <form onSubmit={saveRecord} className="grid gap-4 sm:grid-cols-2">
                  {config.fields.map((field) => (
                    <label key={field.name} className={`text-sm ${field.span || field.textarea ? 'sm:col-span-2' : ''}`}>
                      <span className="mb-1.5 block font-medium text-slate-300">{field.label}{field.required ? ' *' : ''}</span>
                      {field.textarea ? (
                        <textarea
                          value={form[field.name] ?? ''}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="min-h-24 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-300"
                          required={field.required}
                        />
                      ) : field.type === 'checkbox' ? (
                        <span className="flex h-11 items-center gap-3 rounded-md border border-white/10 bg-slate-950 px-3">
                          <input
                            checked={Boolean(form[field.name])}
                            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
                            className="h-4 w-4 accent-cyan-300"
                            type="checkbox"
                          />
                          <span className="text-slate-300">Po</span>
                        </span>
                      ) : (
                        <input
                          value={form[field.name] ?? ''}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="h-11 w-full rounded-md border border-white/10 bg-slate-950 px-3 text-white outline-none focus:border-cyan-300"
                          required={field.required}
                          step={field.step}
                          type={field.type || 'text'}
                        />
                      )}
                    </label>
                  ))}
                  <button disabled={saving} className="h-11 rounded-md bg-cyan-300 px-4 font-semibold text-slate-950 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" type="submit">
                    {saving ? 'Duke ruajtur...' : editing ? 'Ruaj ndryshimet' : 'Shto rekord'}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function readError(err) {
  return err?.response?.data?.message || err?.response?.data?.error || err?.response?.data || err?.message || 'Ndodhi nje gabim i papritur.';
}

export default App;
