import React from 'react'

export default function Vegetables({loader,checkList,handleCheck,formData}) {
  return (
    <div className="container text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div className="col-12 col-md-6 vegetables">
                {loader?
                    <div className="loader d-flex justify-content-center w-100 align-items-center">
                        <img src="./loading.gif" width={40} alt="" />
                    </div>
                :
                <>
                    {checkList.length!==0 ?checkList.map((item, index) => (
                        <div className='vegetable' key={index}>
                            <input value={item} id={item} type="checkbox" onChange={handleCheck}/>
                            <span style={{fontSize:"16px"}}>{item}</span>
                        </div>
                    )):<p>No vegetables available</p>}
                </>
                }
            </div>
            
            <div className="col-12 col-md-6 checked-vegetables">
                <div className="tex-center">
                    <span style={{fontSize:"16px"}}>Items checked</span> 
                </div>
                <div className="veg">
                    {formData.vegetables.map((veg,index)=>(
                        <p style={{fontSize:"16px"}} key={`veg${index}`}>
                            {veg}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
