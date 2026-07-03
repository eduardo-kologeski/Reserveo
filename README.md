# Reserveo

Reserveo e uma plataforma de agendamento online desenvolvida em Angular e integrada ao AuthCore para autenticacao, autorizacao e gerenciamento de usuarios. O projeto nasce como portfolio tecnico com arquitetura escalavel, separacao clara entre `core`, `shared` e `features`, e base preparada para evoluir para uma solucao SaaS para clinicas, saloes, consultorios, oficinas e empresas de servicos.

## Objetivo

Criar um front-end independente para operacoes de agenda, mantendo o AuthCore como provedor central de identidade. O Reserveo consome o AuthCore para login, JWT, refresh token e dados do usuario autenticado, enquanto os endpoints de dominio ficam isolados em uma futura API REST propria do Reserveo.

## Tecnologias

- Angular 22
- TypeScript
- Angular Router
- Reactive Forms
- JWT Authentication
- HTTP interceptors funcionais
- Guards de autenticacao e roles
- REST API
- Docker com Nginx

## Como Rodar Localmente

```bash
npm install
npm start
```

O Angular ficara disponivel em `http://localhost:4200`.

Para build de producao:

```bash
npm run build
```

Com Docker:

```bash
docker build -t reserveo-web .
docker run --rm -p 8088:80 reserveo-web
```

## Integracao Com AuthCore

O AuthCore deve estar rodando em `http://localhost:8080`. As URLs ficam em `src/environments/environment.ts`:

```ts
authCoreApiUrl: 'http://localhost:8080/api'
reserveoApiUrl: 'http://localhost:8081/api'
```

Endpoints AuthCore usados:

| Metodo | Endpoint | Uso no Reserveo |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Login com email, senha, `rememberMe` e `deviceName` |
| `POST` | `/api/auth/refresh` | Rotacao do refresh token e renovacao do access token |
| `POST` | `/api/auth/logout` | Revogacao do refresh token |
| `GET` | `/api/users/me` | Carregamento do usuario autenticado |

O JWT emitido pelo AuthCore inclui `sub`, `userId`, `name` e `role`. Hoje o AuthCore possui roles `USER` e `ADMIN`; no Reserveo, `USER` e normalizado como `CUSTOMER` para preparar a experiencia do produto. Roles `PROFESSIONAL` e `CUSTOMER` como perfis nativos dependem de evolucao futura no AuthCore ou de um backend de dominio que faca esse mapeamento.

## Variaveis de Ambiente

No front-end, ajuste os arquivos:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

No Nginx do Docker, os proxies esperados sao:

- `/authcore/api/` -> `http://authcore:8080/api/`
- `/reserveo/api/` -> `http://reserveo-api:8081/api/`

## Estrutura de Pastas

```text
src/app/core
  guards
  interceptors
  models
  services
src/app/shared
  components
src/app/features
  auth
  appointments
  customers
  dashboard
  professionals
  services
```

## Principais Funcionalidades

- Login integrado ao AuthCore
- Armazenamento de access token em `sessionStorage` e refresh token em `localStorage` quando `rememberMe=true`
- Refresh token com rotacao
- `JwtInterceptor` para chamadas REST
- `AuthGuard` e `RoleGuard`
- Dashboard inicial
- Cadastro, edicao e exclusao de clientes
- Cadastro, edicao e exclusao de servicos
- Cadastro, edicao e exclusao de profissionais
- Criacao, edicao, cancelamento e exclusao de agendamentos
- Filtros de agenda por data, cliente, profissional e status
- Status: `AGENDADO`, `CONFIRMADO`, `CANCELADO`, `CONCLUIDO`
- Tratamento global de erro HTTP e tela de loading

## Prints

Espaco reservado para imagens futuras:

- `docs/images/login.png`
- `docs/images/dashboard.png`
- `docs/images/agenda.png`

## Proximos Passos

- Criar API REST de dominio do Reserveo.
- Persistir clientes, profissionais, servicos e agendamentos.
- Evoluir AuthCore para roles `CUSTOMER` e `PROFESSIONAL`, ou criar mapeamento de perfis no backend Reserveo.
- Adicionar testes unitarios e e2e.
- Adicionar calendario visual com slots por profissional.
- Publicar imagens reais da interface em `docs/images`.
