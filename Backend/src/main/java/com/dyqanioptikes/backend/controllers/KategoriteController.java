@RestController
@RequestMapping("/api/kategorite")
@CrossOrigin(origins = "http://localhost:3000")
public class KategoriteController {

    @Autowired
    private KategoriteRepository kategoriteRepository;

    @GetMapping
    public List<Kategorite> getAllKategorite() {
        return kategoriteRepository.findAll();
    }

    @PostMapping
    public Kategorite createKategori(
            @Valid @RequestBody Kategorite kategori) {

        return kategoriteRepository.save(kategori);
    }

    @PutMapping("/{id}")
    public Kategorite updateKategori(
            @PathVariable Long id,
            @Valid @RequestBody Kategorite updatedKategori) {

        return kategoriteRepository.findById(id)
                .map(kategori -> {

                    kategori.setEmriKategorise(
                            updatedKategori.getEmriKategorise());

                    kategori.setPershkrimi(
                            updatedKategori.getPershkrimi());

                    kategori.setAktive(
                            updatedKategori.getAktive());

                    return kategoriteRepository.save(kategori);
                })
                .orElseThrow(() ->
                        new RuntimeException("Kategoria nuk u gjet"));
    }

    @DeleteMapping("/{id}")
    public void deleteKategori(@PathVariable Long id) {
        kategoriteRepository.deleteById(id);
    }
}
