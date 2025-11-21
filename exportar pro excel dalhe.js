controller

@GetMapping("/exportar-excel")
public ResponseEntity<byte[]> exportarExcel(
        @RequestParam(required = false) String parametro1,
        @RequestParam(required = false) String parametro2
) throws IOException {

    byte[] excel = service.gerarExcel(parametro1, parametro2);

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=dados.xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(excel);
}

a função em si
@Service
public class ExcelService {

    @Autowired
    private MeuRepository repository;

    public byte[] gerarExcel(String parametro1, String parametro2) throws IOException {

        // busca TODOS os dados ignorando paginação
        List<MinhaEntidade> lista = repository.buscarComFiltros(parametro1, parametro2);

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Dados");

        // cabeçalho
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID");
        header.createCell(1).setCellValue("Nome");
        header.createCell(2).setCellValue("Valor");

        // corpo
        int rowNum = 1;
        for (MinhaEntidade item : lista) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(item.getId());
            row.createCell(1).setCellValue(item.getNome());
            row.createCell(2).setCellValue(item.getValor());
        }

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        workbook.write(stream);
        workbook.close();

        return stream.toByteArray();
    }
}

repository (usa o repository das ocorrencias)
@Query("SELECT e FROM MinhaEntidade e " +
       "WHERE (:parametro1 IS NULL OR e.campo1 = :parametro1) " +
       "AND (:parametro2 IS NULL OR e.campo2 = :parametro2)")
List<MinhaEntidade> buscarComFiltros(
        @Param("parametro1") String parametro1,
        @Param("parametro2") String parametro2
);

front
const exportarExcel = async () => {
  const params = {
    parametro1: filtros.parametro1,
    parametro2: filtros.parametro2
  };

  const query = new URLSearchParams(params).toString();

  const response = await fetch(`/api/exportar-excel?${query}`, {
    method: 'GET'
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'dados.xlsx';
  document.body.appendChild(a);
  a.click();
  a.remove();
};



@GetMapping("/exportar-excel")
public ResponseEntity<byte[]> exportarExcel(
        @RequestParam(required = false) String parametro1,
        @RequestParam(required = false) String parametro2
) throws IOException {

    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Dados");

    int rowNum = 0;

    // Cabeçalho
    Row header = sheet.createRow(rowNum++);
    header.createCell(0).setCellValue("ID");
    header.createCell(1).setCellValue("Nome");
    header.createCell(2).setCellValue("Valor");

    int page = 0;
    int pageSize = 10;

    Page<MinhaEntidade> resultado;

    do {
        Pageable pageable = PageRequest.of(page, pageSize);

        resultado = repository.findByFiltros(parametro1, parametro2, pageable);

        for (MinhaEntidade item : resultado.getContent()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(item.getId());
            row.createCell(1).setCellValue(item.getNome());
            row.createCell(2).setCellValue(item.getValor());
        }

        page++;

    } while (!resultado.isLast());

    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    workbook.write(stream);
    workbook.close();

    byte[] excel = stream.toByteArray();

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=dados.xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(excel);
}
