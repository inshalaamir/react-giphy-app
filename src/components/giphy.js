import React, {useEffect,useState} from 'react'
import axios from 'axios'
import "./giphy.css"
import Modal from "react-modal"
import {useHistory} from "react-router-dom"
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'


function Giphy() {

    const [data,setData] = useState([])
    const [search, setSearch] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const [dataParams, setDataParams] = useState({
      total_count: 0,
      current_offset: 0,
      max_offset:0
    })
    const history = useHistory()

    useEffect(()=>{

        const fetchData = async () =>{
            const results= await axios("https://api.giphy.com/v1/gifs/trending",
            {
                params:{ api_key : "v6IdrxWNLHZjexkM8aUHNTem9u0YHZiX", 
              } 
            })

            console.log(results)
            setData(results.data.data)
            setDataParams({
              total_count: results.data.pagination.total_count,
              current_offset:50,
            })
        }

        fetchData()

    },[])

    // USING GIPHY SDK
    // const gf = new GiphyFetch('v6IdrxWNLHZjexkM8aUHNTem9u0YHZiX')
    // const fetchGifs = () => gf.trending({ limit: 10 })

    const renderGifs = () => {
      const placeholders = ['#FF4848','#FFD848','#A6FF48','#48F4FF', '#A148FF']
      return data.map(element=>{
        return(
          <div key={element.id} className="giphy__gif"
          style={{backgroundColor: placeholders[Math.floor(Math.random() * placeholders.length)]}}
          onClick={()=> handleModal(element)}
          >
            <img src={element.images.fixed_height.url} 
            width={element.images.fixed_height.width}
            height={"200px"}></img>

          </div>
        )
      })
    }

    const handleFavourites = () => {
      setModalOpen(true)
      
    }

    const handleModal = (element) => {
      setModalData(element)
      setModalOpen(true)
    }

    const handleSearch = (e) => {
      setSearch(e.target.value)
    }

    const handleSubmit = async (e) => {
      
        e.preventDefault()
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
          params:{
            api_key: "v6IdrxWNLHZjexkM8aUHNTem9u0YHZiX",
            q: search
          }
        })

        setData(results.data.data)
    }

    const handleScroll = async (e) => {
      const target = e.target
      if (target.scrollHeight - target.scrollTop === target.clientHeight 
        && dataParams.current_offset<dataParams.total_count){

        const results= await axios("https://api.giphy.com/v1/gifs/trending",
            {
                params:{ 
                  api_key : "v6IdrxWNLHZjexkM8aUHNTem9u0YHZiX",
                  offset: dataParams.current_offset 
              } 
            })
        console.log(results)
        setDataParams(prevState => ({
          ...prevState,
          current_offset: dataParams.current_offset + 50
       }))    
        setData([...data,...results.data.data])
      }
    }

    const addToFavourites=(id)=>{
      const alreadyFavourites=localStorage.getItem("favourites")
      console.log(alreadyFavourites)
      if(alreadyFavourites)
      {
        var parsedArray=JSON.parse(alreadyFavourites)
        if(!parsedArray.includes(id))
        {
          parsedArray.push(id)
          var string=JSON.stringify(parsedArray)
          localStorage.setItem("favourites",string)
        }
        
      }
      else
      {
        var fav=[id]
        var string=JSON.stringify(fav)
        localStorage.setItem("favourites",string)
      }

    }
    

    

  return (
    <div className='giphy__container'>
        {/* <Grid width={800} columns={3} fetchGifs={fetchGifs} /> */}
        <form className='giphy__form'>

          <input type="text" placeholder='search' onChange={handleSearch} value={search}
          className='form-control'/>

          <button onClick={handleSubmit} type='submit' className='btn btn-primary mx-2'>Go</button>

          <button onClick={()=> history.push({pathname:"/favourites"})} className='btn btn-success mx-2'>Favourites</button>

        </form>

        <div className='container giphy__gifs' onScroll={handleScroll}>
        {renderGifs()}
        </div>

        
        
        {modalOpen==true ?
        <Modal isOpen={modalOpen}>

          <div className='giphy__modalContainer'>
            <div className="giphy__gif" style={{backgroundColor: "#FF4848"}}>
              <img src={modalData.images.downsized_large.url}></img>
          </div>

            <div className='giphy__modalInfo'>
              <h4>Gif title: {modalData.title}</h4>
              <h4>Uploaded by: {modalData.username}</h4>
              <button className='btn btn-success mx-4 mb-2' onClick={()=>addToFavourites(modalData.id)}>Like</button>
              <button className='btn btn-danger mx-4' onClick={()=>setModalOpen(false)}>Back</button>
            </div>
          </div>
          
        </Modal>:""}

        

    </div>
  )


}


export default Giphy