import org.apache.commons.csv.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class CsvLeitor {

    public static List<Map<String, String>> lerCsvComCabecalhoNaSetimaLinha(String caminhoArquivo) throws IOException {
        List<Map<String, String>> registros = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(caminhoArquivo), StandardCharsets.UTF_8))) {

            // Ignora as 6 primeiras linhas
            for (int i = 0; i < 6; i++) {
                reader.readLine();
            }

            // Lê a sétima linha como cabeçalho
            String linhaCabecalho = reader.readLine();
            if (linhaCabecalho == null) {
                throw new IOException("Arquivo não possui 7 linhas para definir cabeçalho!");
            }

            // Cria o formato CSV com o tab como delimitador
            CSVFormat formato = CSVFormat.DEFAULT
                    .withDelimiter('\t')
                    .withQuote('"')
                    .withIgnoreSurroundingSpaces()
                    .withHeader(linhaCabecalho.split("\t"))
                    .withSkipHeaderRecord();

            // Usa o parser da Apache Commons CSV
            CSVParser parser = new CSVParser(reader, formato);

            for (CSVRecord record : parser) {
                // Verifica se a linha é vazia
                boolean linhaVazia = true;
                for (String campo : record) {
                    if (campo != null && !campo.trim().isEmpty()) {
                        linhaVazia = false;
                        break;
                    }
                }
                if (linhaVazia) break;

                // Converte cada linha em um mapa (coluna -> valor)
                Map<String, String> linha = new LinkedHashMap<>();
                for (String cabecalho : parser.getHeaderNames()) {
                    linha.put(cabecalho, record.get(cabecalho));
                }
                registros.add(linha);
            }

            parser.close();
        }

        return registros;
    }

    public static void main(String[] args) {
        try {
            List<Map<String, String>> dados = lerCsvComCabecalhoNaSetimaLinha("dados.csv");

            for (Map<String, String> linha : dados) {
                System.out.println(linha);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
