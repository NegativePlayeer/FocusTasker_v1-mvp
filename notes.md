# FocusTasker — Learning Notes

## Session 1 — JWT Auth

### What is a JWT token?
- A way to send and protect sensitive user data using a special string
- Divided into 3 parts: **Header**, **Payload**, **Signature**
  - ⚠️ The third part is **Signature** — not "Algorithm". The algorithm (e.g. HS256) is used *to create* the signature.

### Why use JWT instead of sending username + password every request?
- More secure — credentials are only sent once (at login)
- The token acts as a temporary proof of identity

### Why add `exp` (expiry) to the payload?
- Limits the token's valid lifespan (e.g. 30 minutes)
- **Security reason:** if a token is stolen, the attacker only has a limited window before it becomes useless
- Without expiry — a stolen token works **forever**

### Why use `not` in the password check?
```python
if user_model is None or not auth.verify_password(user_data.password, user_model.hashed_password):
    raise HTTPException(401)
```
- `verify_password` returns `True` when the password is **correct**
- We raise 401 when it's **wrong** — so we negate it with `not`
