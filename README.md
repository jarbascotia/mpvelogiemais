# Projeto ElogieMais - Descrição do Projeto

Este Projeto foi desenvolvido para atender aos requisitos de entrega do MVP da disciplina **Desenvolvimento Front-end Avançado**.

Trata-se de uma página que fala sobre os benefícios do elogio na vida de quem elogia e quem o recebe. Há também dados fictícios de elogios sobre supostos atendimentos.

Foi implementado um Front-end utilizando React, que lê três arquivos Json diferentes. Na primeira página, há um carrossel com algumas imagens, e algumas estatísticas extraídas das bases em Json.

Há uma segunda página com a lista dos dados extraídos, onde é possível aplicar filtros por data e também por idade. 

Já na terceira página há um gráfico, que também utiliza os dados das bases em Json, e no qual é possível aplicar os mesmos filtros.

Em todas as páginas são aproveitados os componentes banner, footer, um menu de navegação entre as páginas, um card com vídeos sobre o tema e speed dial que habilita funções como copiar, salvar, impressão e compartilhamento da página.

# Projeto ElogieMais - Prototipação em Figma

https://www.figma.com/proto/BV4HKKa9LSWLKCCHPaz4sv/Elogie%2B-Prototipa%C3%A7%C3%A3o-em-Figma?page-id=134%3A128&node-id=134-143&node-type=frame&viewport=1292%2C1288%2C0.5&t=vbcrRfZHPx7fsAy5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=134%3A143

Acima há um Protótipo de três páginas em alta fidelidade do Projeto Elogie+, com menu de navegação interativo entre as páginas, também foi implementado o hover nos botões do referido menu, bem como o carrossel da página principal foi animado com as imagens do projeto.

# Projeto ElogieMais - Como executar o front

Não há nenhuma API vinculada ao projeto, sendo utilizado dos dados fictícios de arquivos Json já incluídos no diretório clonado.

Após clonar o repositório, é necessário ir ao diretório raiz desse projeto pelo terminal para poder executar os comandos descritos abaixo.

$ npm install

Este comando instala as dependências/bibliotecas.

Para executar a interface basta executar o comando:

$ npm start

Abra o http://localhost:3000/#/ no navegador.
