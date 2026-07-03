# Roles E Permissoes

## Perfis Planejados

| Role | Permissoes |
| --- | --- |
| `ADMIN` | Cadastrar, editar e excluir qualquer registro. |
| `PROFESSIONAL` | Visualizar e atualizar seus proprios agendamentos. |
| `CUSTOMER` | Visualizar e criar seus proprios agendamentos. |

## Estado Atual Do AuthCore

O AuthCore implementa `ADMIN` e `USER`. Para o Reserveo, `USER` e tratado como `CUSTOMER` no front-end. Essa normalizacao e util para portfolio e prototipacao, mas nao substitui autorizacao no backend.

## Rotas Protegidas

- `/dashboard`: autenticado.
- `/appointments`: `ADMIN`, `PROFESSIONAL`, `CUSTOMER`.
- `/customers`: `ADMIN`, `CUSTOMER`.
- `/professionals`: `ADMIN`, `PROFESSIONAL`.
- `/services`: `ADMIN`.
