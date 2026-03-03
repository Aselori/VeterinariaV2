import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import BookingForm from '@/components/BookingForm'
import ContactForm from '@/components/ContactForm'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <>
      <Hero />
      <Chatbot />
      <About />
      <Services />
      <BookingForm />
      <ContactForm />
    </>
  )
}
