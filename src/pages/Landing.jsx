import About from "../components/about/About"
import Beneficios from "../components/beneficios/Beneficios"
import Contact from "../components/contact/Contact"
import ExploraConecta from "../components/ExploraConecta/ExploraConecta"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import HowItWorks from "../components/how/HowItWorks"
import ProblemSolution from "../components/problemSolution/ProblemSolution"


const Landing = () => {
    return (
        <>
            <div data-aos="fade-down">
                <Header />
            </div>
            <About />
            <ProblemSolution />
            <Beneficios />
            <HowItWorks />
            <ExploraConecta />
            <Contact />
            <Footer />
        </>
    )
}

export default Landing