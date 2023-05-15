'use client'
import { signIn } from 'next-auth/react'
import styles from './page.module.css'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Login() {

    async function handleSubmit(event) {
        event.preventDefault()
        // const { email, password } = Object.fromEntries(formData.entries())
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value
        // Send email and password to your API route

        await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/'
        })

        // call teh signIn function here and pass the email and password and redirect to home page
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.loginTitle}>Log in</h2>

            <form className={styles.loginForm} onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">Email </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="me@example.com"
                        name="email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                    />
                </div>

                <button className={[styles.btn, styles.btnHtmlForm].join(' ')} type="submit" value="Log in">
                    Log in
                </button>

                {/* <a className={[styles.btn, styles.btnHtmlForm].join(' ')}
                    href=https://github.com/login?client_id=7f8723788deb025dd49b&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D7f8723788deb025dd49b%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fapi%252Fauth%252Fcallback%252Fgithub%26response_type%3Dcode%26scope%3Dread%253Auser%2Buser%253Aemail%26state%3DRRHVUUxMheaR6ATPUOwkke3VLb6mdglB_qcTA4cpadY'>
                <i className='fab fa-github'>Login with Github</i>
            </a> */}
                <Link href={'/register'}> New User? Register </Link>

            </form>

        </div >
    )
}
