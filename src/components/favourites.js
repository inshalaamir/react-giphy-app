import React, {useEffect,useState} from 'react'
import axios from 'axios'
import "./favourites.css"

function Favourites() {

    const [data, setData]= useState([])

    useEffect(()=>{

        const fetchData = async () =>{
            const alreadyFavourites=localStorage.getItem("favourites")
            if(alreadyFavourites){
                var parsedArray=JSON.parse(alreadyFavourites)
                var IDs = parsedArray.toString()
            

            const results= await axios("https://api.giphy.com/v1/gifs",
            {
                params:{ api_key : "v6IdrxWNLHZjexkM8aUHNTem9u0YHZiX", ids: IDs
              } 
            })

            console.log(results)
            setData(results.data.data)
        }
            
        }

        fetchData()

    },[])

    const renderGifs = () => {
        const placeholders = ['#FF4848','#FFD848','#A6FF48','#48F4FF', '#A148FF']
        return data.map(element=>{
          return(
            <div key={element.id} className="giphy__gif"
            style={{backgroundColor: placeholders[Math.floor(Math.random() * placeholders.length)]}}
            
            >
              <img src={element.images.fixed_height.url} 
              width={element.images.fixed_height.width}
              height={"200px"}></img>
  
            </div>
          )
        })
      }

  return (
    <div className='giphy__container'>
        <div className='favourites__heading'><h2>Your favourite Gifs</h2></div>
        <div className='container giphy__gifs'>
        {renderGifs()}
        </div>
    </div>
  )
}

export default Favourites