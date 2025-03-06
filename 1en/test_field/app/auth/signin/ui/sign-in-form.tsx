'use client'
import { login } from '../action/auth';
import { useActionState } from 'react';

export default function SigninForm() {
  const [state, formAction] = useActionState(login, { message: '' });

  return (
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Login</button>

        {state.message && <p>{state.message}</p>}
        
      </form>
  );
}