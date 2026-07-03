# Arquitetura

Reserveo e um front-end Angular separado do AuthCore. A aplicacao usa o AuthCore como provedor de identidade e uma API REST propria para recursos de agenda.

```text
Angular Reserveo
  -> AuthCore API: login, refresh, logout, usuario autenticado
  -> Reserveo API: customers, professionals, services, appointments
```

## Camadas

- `core`: modelos, services HTTP, guards e interceptors.
- `shared`: componentes reutilizaveis, como loading.
- `features`: telas e fluxos por dominio.

## Fluxo HTTP

1. Usuario autentica via AuthCore.
2. Reserveo armazena access token e, quando houver `rememberMe`, refresh token.
3. `JwtInterceptor` adiciona `Authorization: Bearer`.
4. `AuthGuard` protege as rotas autenticadas.
5. `RoleGuard` limita acesso por perfil.
