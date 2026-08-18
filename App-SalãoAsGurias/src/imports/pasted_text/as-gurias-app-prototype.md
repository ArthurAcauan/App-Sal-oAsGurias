Crie um protótipo navegável de alta fidelidade para um aplicativo mobile chamado **"As Gurias — Agenda"**, desenvolvido para o **Salão de Beleza As Gurias**, da proprietária Ana Paula Flores.

O aplicativo será utilizado por clientes do salão para consultar serviços e solicitar horários, e pela proprietária para controlar e gerenciar a agenda.

O objetivo é criar uma solução **simples, intuitiva, elegante e funcional**, adequada para clientes de diferentes faixas etárias.

---

# 1. OBJETIVO DO APLICATIVO

O aplicativo deve solucionar dois problemas principais:

### Para as clientes

Facilitar a consulta dos serviços, escolha dos procedimentos, visualização de horários disponíveis e solicitação de agendamento.

### Para a proprietária

Permitir visualizar a agenda, analisar solicitações de agendamento, visualizar clientes e procedimentos e controlar o status dos atendimentos.

O aplicativo deve possuir dois tipos de experiência:

* Cliente
* Administradora/Proprietária

---

# 2. IDENTIDADE VISUAL

Utilize a logo fornecida do Salão de Beleza As Gurias como referência principal.

A identidade visual deve transmitir:

* Elegância
* Beleza
* Feminilidade
* Sofisticação
* Simplicidade
* Acolhimento

### Paleta

Priorizar:

* Preto/carvão para textos e elementos principais
* Branco/off-white para fundos
* Nude/bege em elementos secundários
* Cinza claro para divisões
* Verde somente como pequena referência visual ao WhatsApp, quando necessário

Não utilizar excesso de cores.

A interface deve ser predominantemente clara e elegante.

### Tipografia

Utilizar:

* Uma fonte elegante/script para títulos ou elementos de identidade;
* Uma fonte sans-serif extremamente legível para textos, botões, formulários e informações.

A legibilidade deve ser prioridade.

---

# 3. CARACTERÍSTICAS DO SALÃO

Considerar estas informações como regras reais da aplicação:

### Funcionamento

O salão funciona:

**Terça-feira a sábado**

### Horário

Manhã:

**08:30 às 12:00**

Intervalo:

**12:00 às 13:30**

Tarde:

**13:30 às 18:00**

### Profissionais

Existe apenas:

**1 profissional — a proprietária Ana Paula**

Portanto, o aplicativo deve considerar que somente um atendimento pode ocorrer simultaneamente.

---

# 4. SERVIÇOS

Cadastrar os seguintes serviços:

| Serviço             |     Preço | Duração média |
| ------------------- | --------: | ------------: |
| Corte               |  R$ 70,00 |        60 min |
| Escova              |  R$ 60,00 |        45 min |
| Coloração (pintura) | R$ 100,00 |       120 min |
| Mechas              | R$ 230,00 |       180 min |
| Hidratação          |  R$ 80,00 |        60 min |
| Progressiva         | R$ 100,00 |       150 min |
| Blindagem           | R$ 100,00 |        90 min |
| Botox               |  R$ 80,00 |        90 min |
| Manicure            |  R$ 30,00 |        45 min |
| Pedicure            |  R$ 40,00 |        45 min |
| Sobrancelha         |  R$ 20,00 |        20 min |
| Bússo               |  R$ 10,00 |        15 min |
| Maquiagem           |  R$ 80,00 |        90 min |
| Penteado            | R$ 120,00 |        90 min |

As durações são **estimativas para o MVP** e servem para demonstrar o cálculo de disponibilidade.

Não apresentar essas durações como valores oficiais do salão.

---

# 5. EVENTOS ESPECIAIS

Criar uma seção separada:

**Eventos especiais**

Itens:

* Debutantes
* Casamentos
* Comunhão
* Pacotes personalizados

Mostrar:

**"Sob consulta"**

Não permitir agendamento automático desses eventos no MVP.

---

# 6. REGRA DE DESCONTO

Quando a cliente selecionar:

**3 ou mais procedimentos**

aplicar automaticamente:

**10% de desconto**

Exemplo visual:

3 procedimentos

Subtotal: R$ 250,00

Desconto 10%: - R$ 25,00

Total: R$ 225,00

Mostrar o desconto de maneira bastante clara para a cliente.

---

# 7. REGRA DE DISPONIBILIDADE

O aplicativo deve considerar:

* Dias de funcionamento;
* Horário de funcionamento;
* Intervalo;
* Duração dos procedimentos;
* Agendamentos já existentes;
* Uma única profissional.

Exemplo:

Se a cliente selecionar um procedimento de 120 minutos e escolher 14:00, o sistema deve verificar se existe espaço suficiente entre 14:00 e 16:00.

Não permitir horários que ultrapassem o horário de funcionamento.

Também não permitir que um atendimento atravesse o intervalo:

12:00–13:30.

Exemplo:

Um serviço que começa às 11:00 e dura 120 minutos deve ser considerado indisponível, pois ultrapassa o período da manhã.

---

# 8. FLUXO DA CLIENTE

Criar o seguinte fluxo navegável:

**Home**

↓

**Serviços**

↓

**Selecionar procedimentos**

↓

**Escolher data**

↓

**Ver horários disponíveis**

↓

**Selecionar horário**

↓

**Informar dados**

↓

**Revisar solicitação**

↓

**Solicitar agendamento**

↓

**Confirmação — Pendente**

---

# 9. TELA — SPLASH

Criar uma tela inicial elegante.

Elementos:

* Logo As Gurias
* Nome "As Gurias"
* "Agenda"

Design minimalista.

---

# 10. TELA — HOME

Criar uma Home simples.

Elementos:

Logo

"Bem-vinda ao As Gurias"

Texto curto apresentando o salão.

Criar uma seção:

**"Sobre nós"**

com uma breve descrição fictícia e elegante do salão.

Adicionar botão principal:

**"Agendar horário"**

Adicionar botão secundário:

**"Conhecer serviços"**

Adicionar seção:

**"Serviços em destaque"**

Mostrar alguns serviços.

Adicionar informações de contato.

A ação principal da Home deve ser claramente:

**Agendar horário**

---

# 11. TELA — SERVIÇOS

Título:

**"Nossos serviços"**

Mostrar os serviços em cards ou lista.

Cada item deve mostrar:

* Nome
* Preço
* Duração aproximada
* Ícone ou imagem discreta

Permitir clicar em um serviço.

Adicionar botão:

**"Selecionar serviços"**

Criar também seção:

**"Eventos especiais"**

com:

Debutantes
Casamentos
Comunhão
Pacotes personalizados

Todos marcados como:

**Sob consulta**

---

# 12. TELA — SELEÇÃO DE SERVIÇOS

Título:

**"O que você deseja fazer?"**

Permitir selecionar múltiplos procedimentos.

Cada item deve possuir:

* Nome
* Preço
* Duração
* Checkbox ou controle visual de seleção

Criar resumo fixo na parte inferior.

Exemplo:

**2 serviços**

Subtotal: R$ 130,00

Duração estimada: 1h45

Quando houver 3 ou mais serviços:

Mostrar destaque:

**"Você ganhou 10% de desconto!"**

Exemplo:

Subtotal: R$ 250,00

Desconto: R$ 25,00

Total: R$ 225,00

Mostrar também:

**Duração estimada: 3h**

Botão:

**"Continuar"**

---

# 13. TELA — ESCOLHA DA DATA

Título:

**"Escolha a data"**

Mostrar calendário mobile.

Considerar:

* Segunda-feira indisponível
* Domingo indisponível
* Terça a sábado disponíveis

Datas passadas devem estar desabilitadas.

Criar diferenciação visual entre:

* Disponível
* Indisponível
* Selecionado

Após selecionar uma data:

Botão:

**"Ver horários"**

---

# 14. TELA — ESCOLHA DO HORÁRIO

Título:

**"Qual horário fica melhor para você?"**

Mostrar horários disponíveis em cards.

Exemplo:

09:00
09:30
10:00
10:30
11:00

13:30
14:00
14:30
15:00
15:30
16:00
16:30

Horários ocupados devem aparecer desabilitados.

Horários que não comportam a duração total do procedimento também devem aparecer indisponíveis.

Mostrar visualmente:

**"Duração estimada: 2h"**

Horário selecionado deve ser destacado.

Botão:

**"Continuar"**

---

# 15. TELA — DADOS DA CLIENTE

Título:

**"Quase pronto!"**

Campos:

**Nome completo**

**Telefone / WhatsApp**

Não criar formulário excessivamente grande.

Mostrar resumo:

Serviços

Data

Horário

Duração

Subtotal

Desconto

Total

Botão:

**"Revisar agendamento"**

---

# 16. TELA — REVISÃO

Título:

**"Confira seu agendamento"**

Mostrar um card completo:

Cliente

Procedimentos

Data

Horário

Duração estimada

Subtotal

Desconto

Total

Adicionar aviso:

**"Seu horário será enviado para aprovação do salão."**

Botão principal:

**"Solicitar agendamento"**

---

# 17. TELA — CONFIRMAÇÃO

Criar uma tela de sucesso elegante.

Mensagem:

**"Solicitação enviada!"**

Texto:

"Seu pedido de agendamento foi enviado para o salão."

Mostrar:

Status:

**Pendente**

Data

Horário

Serviços

Valor

Adicionar:

"Você poderá acompanhar o status em Meus Agendamentos."

Botão:

**"Ver meus agendamentos"**

Botão secundário:

**"Voltar para início"**

---

# 18. TELA — MEUS AGENDAMENTOS

Título:

**"Meus agendamentos"**

Separar:

### Próximos

### Histórico

Cada card deve mostrar:

* Data
* Horário
* Serviços
* Valor
* Status

Status possíveis:

**Pendente**

**Confirmado**

**Concluído**

**Cancelado**

Criar diferenciação visual clara entre os status.

Ao abrir um agendamento, mostrar seus detalhes.

---

# 19. CANCELAMENTO

Adicionar opção:

**"Cancelar agendamento"**

Antes do cancelamento, mostrar:

### Política de cancelamento

"Cancelamentos realizados com 24 horas ou mais de antecedência não possuem multa."

"Cancelamentos realizados com menos de 24 horas de antecedência possuem multa de R$ 20,00."

Se o cancelamento ocorrer com menos de 24 horas:

Mostrar destaque:

**"Este cancelamento possui multa de R$ 20,00."**

Botões:

**"Confirmar cancelamento"**

**"Voltar"**

No MVP não implementar pagamento da multa.

Apenas registrar/exibir a multa.

---

# 20. ÁREA ADMINISTRATIVA

Criar uma experiência visual diferente da área da cliente, porém mantendo a mesma identidade visual.

---

# 21. LOGIN ADMINISTRATIVO

Tela:

Logo

**"Área administrativa"**

Campo:

E-mail

Campo:

Senha

Botão:

**"Entrar"**

Não criar cadastro público de administradores.

---

# 22. DASHBOARD / AGENDA

Título:

**"Agenda"**

Mostrar a data atual.

Criar navegação:

← Dia anterior

**Hoje**

Dia seguinte →

Mostrar quantidade de atendimentos.

Exemplo:

**5 atendimentos**

Mostrar agenda organizada por horário.

Exemplo:

09:00

Maria Silva

Corte

60 min

Confirmado

---

10:00

Juliana Souza

Mechas

180 min

Confirmado

---

14:00

Camila Oliveira

Manicure + Pedicure

90 min

Pendente

---

Criar visualização clara dos períodos:

**Manhã — 08:30 às 12:00**

**Tarde — 13:30 às 18:00**

---

# 23. DETALHES DO AGENDAMENTO

Mostrar:

Cliente

Telefone

Data

Horário

Procedimentos

Duração

Subtotal

Desconto

Total

Status

Criar ações:

**"Aprovar agendamento"**

**"Cancelar"**

**"Concluir atendimento"**

---

# 24. APROVAÇÃO

Quando um agendamento estiver:

**Pendente**

a administradora deve conseguir:

**Confirmar**

ou

**Cancelar**

Ao confirmar:

Status muda para:

**Confirmado**

Ao cancelar:

Status muda para:

**Cancelado**

Criar feedback visual após a ação.

---

# 25. ESTADOS DO APLICATIVO

Criar exemplos visuais para:

### Nenhum horário disponível

Mensagem:

"Não encontramos horários disponíveis para esta data."

Botão:

"Escolher outra data"

### Nenhum agendamento

Mensagem:

"Você ainda não possui agendamentos."

Botão:

"Agendar horário"

### Loading

Criar estado de carregamento simples.

### Erro

Mensagem amigável:

"Não foi possível carregar as informações. Tente novamente."

### Horário indisponível

Mensagem:

"Este horário acabou de ser ocupado. Escolha outro horário."

### Cancelamento

Mostrar confirmação antes de cancelar.

---

# 26. NAVEGAÇÃO

Para a cliente utilizar bottom navigation:

**Início**

**Serviços**

**Agendamentos**

**Perfil**

O fluxo de agendamento deve ser independente e sequencial.

Para a administradora:

**Agenda**

**Agendamentos**

**Perfil**

---

# 27. EXPERIÊNCIA DO USUÁRIO

Priorizar simplicidade.

Utilizar:

* Botões grandes
* Campos fáceis de preencher
* Textos legíveis
* Espaçamento confortável
* Hierarquia visual clara
* Poucos elementos por tela
* Feedback visual após ações

Evitar:

* Menus complexos
* Telas sobrecarregadas
* Excesso de animações
* Pequenos elementos clicáveis
* Excesso de informações
* Linguagem técnica

O aplicativo deve parecer algo que uma pessoa com pouca familiaridade com tecnologia consegue utilizar sem explicação.

---

# 28. COMPONENTES REUTILIZÁVEIS

Criar componentes reutilizáveis para:

* Botões
* Cards
* Serviços
* Horários
* Agendamentos
* Status
* Inputs
* Cabeçalhos
* Calendário
* Modal de confirmação

---

# 29. RESPONSIVIDADE

Priorizar smartphone.

Utilizar como referência:

**390 x 844 px**

O layout deve funcionar em diferentes tamanhos de dispositivos móveis.

---

# 30. PROTÓTIPO NAVEGÁVEL

Não criar apenas telas estáticas.

Criar protótipo navegável com os principais fluxos.

### Fluxo cliente

Home

→ Serviços

→ Seleção de serviços

→ Data

→ Horário

→ Dados

→ Revisão

→ Solicitação

→ Confirmação

→ Meus agendamentos

### Fluxo administrativo

Login

→ Agenda

→ Detalhes

→ Aprovar

→ Status Confirmado

### Fluxo de cancelamento

Agendamento

→ Cancelar

→ Verificar política

→ Confirmar cancelamento

→ Status Cancelado

---

# 31. DADOS DE DEMONSTRAÇÃO

Utilizar dados fictícios para preencher o protótipo.

Exemplo:

Cliente:

**Maria Silva**

Telefone:

**(51) 99999-9999**

Agendamento:

**Corte + Escova**

Data:

**20/08/2026**

Horário:

**14:00**

Duração:

**1h45**

Subtotal:

**R$ 130,00**

Desconto:

**R$ 0,00**

Total:

**R$ 130,00**

Status:

**Pendente**

Criar também um exemplo com 3 procedimentos para demonstrar o desconto de 10%.

---

# 32. IMPORTANTE SOBRE O MVP

O aplicativo NÃO precisa implementar:

* Pagamento online
* Pix
* Notificações push
* Integração com Google Calendar
* WhatsApp automático
* Programa de fidelidade
* Financeiro
* Relatórios avançados
* Cadastro de várias profissionais

Essas funcionalidades podem aparecer como possibilidades futuras, mas não devem fazer parte do fluxo principal do protótipo.

O foco deve ser:

**Agendamento + disponibilidade + aprovação + agenda administrativa.**

---

# 33. RESULTADO ESPERADO

O resultado deve parecer um aplicativo real de um salão de beleza, pronto para ser implementado.

Priorizar:

1. Usabilidade
2. Clareza
3. Elegância
4. Fluxo de agendamento
5. Agenda administrativa
6. Regras de negócio
7. Consistência visual

O protótipo deve demonstrar claramente que a solução resolve a necessidade apresentada pela proprietária do Salão de Beleza As Gurias.
