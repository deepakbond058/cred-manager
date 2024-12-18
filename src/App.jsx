import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Content from './Components/Content'

const App = ()=>{
  return(
    <div className='bg-green-50 min-h-screen'>
      <Navbar/>
      <Content/>
      <Footer/>
    </div>
  )
}
export default App;