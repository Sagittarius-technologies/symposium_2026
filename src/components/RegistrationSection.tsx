import { useEffect } from 'react'

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section id="register" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-secondary mb-4 text-center">
        Symposium Registration
      </h2>

      <p className="text-neutral-400 text-center mb-8">
        Fill in your details, choose your pass, and complete payment in one step.
        A confirmation email will be sent after submission.
      </p>

      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfrNLgUTZumDPrj6PB7KupCw_-tSBmkax8WVefIBGRTqD5nhw/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="w-full"
          title="Symposium Registration Form"
        >
          Loading…
        </iframe>
      </div>
    </section>
  )
}
