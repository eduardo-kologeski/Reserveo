# Autenticacao

O AuthCore foi analisado sem alteracoes diretas. Ele usa Spring Security stateless, JWT e refresh token opaco com rotacao.

## Endpoints

| Metodo | Endpoint | Payload |
| --- | --- | --- |
| `POST` | `/api/auth/login` | `email`, `password`, `rememberMe`, `deviceName` |
| `POST` | `/api/auth/refresh` | `refreshToken` |
| `POST` | `/api/auth/logout` | `refreshToken` |
| `GET` | `/api/users/me` | Bearer token |

## Claims JWT

O JWT inclui:

- `sub`: email do usuario.
- `userId`: identificador.
- `name`: nome.
- `role`: role do AuthCore.
- `iat` e `exp`.

## Armazenamento

- Login sem refresh: access token em `sessionStorage`.
- Login com refresh: access token e refresh token em `localStorage`.
- Logout: revoga refresh token no AuthCore e limpa armazenamento local.

## Limitacao Atual

AuthCore possui `USER` e `ADMIN`. Reserveo normaliza `USER` como `CUSTOMER` para a interface, mas `PROFESSIONAL` e `CUSTOMER` como roles reais ainda dependem de evolucao no AuthCore.
