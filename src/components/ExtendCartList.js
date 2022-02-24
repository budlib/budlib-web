import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postCall } from '../helpers/postCall';
import Calendar from 'react-calendar';
const url = '/api/loaners/';


const ExtendCartList = (props) => {


  const [cart, setCart] = useState([]);
  const librarianId = 1;
  const { id } = useParams();
  let thisurl = url +id +'/loans';
  console.log(thisurl);
  const { data } = useFetch(thisurl);
  console.log(data);
  const [date, setDate] = useState(new Date());
  const handleAdd =(e)=>{
    let newCart = cart;
    let exist = false;
    let st = e.target.value.split("@")
    console.log(st[2]);
    if(parseInt(st[2])>0){
      for(var i = 0; i < newCart.length; i++)
      {
        console.log(i);

        if(newCart[i]["bookId"] == parseInt(st[0])  )
        {
          if(newCart[i]["copies"]<parseInt(st[2])){
            newCart[i]["copies"] = parseInt(newCart[i]["copies"])+1;

          }else{
            window.alert("No More Availability. ");
          }

          exist = true;
        }
      }

      if(exist == false){

        newCart.push({

          "bookId": parseInt(st[0]),
          "title":st[1],
          "available":st[2],
          "copies": 1
        })

      }


    setCart([...newCart]);

    console.log(cart);

    }else{
      window.alert("No More Availability. " );
    }



  };

  const handlePos =(e)=>{
    let newCart = cart;
    for(var i = 0; i < newCart.length; i++)
      {
        console.log(e.target.value);


        if(newCart[i]["bookId"] == e.target.value)
        {
          if(newCart[i]["copies"]<parseInt(newCart[i]["available"])){
          newCart[i]["copies"] = parseInt(newCart[i]["copies"])+1;
          setCart([...newCart]);
          }else{
            window.alert("No More Availability. ");
          }

        }
      }
      console.log(cart);

  }

  function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele["bookId"] != value;
    });
}

  const handleNeg =(e)=>{
    let newCart = cart;
    for(var i = 0; i < newCart.length; i++)
      {
        console.log(e.target.value);

        if(newCart[i]["bookId"] == e.target.value)
        {
          newCart[i]["copies"] = parseInt(newCart[i]["copies"])-1;
          setCart([...newCart]);

        }

        if(newCart[i]["copies"]==0){
          console.log("Length before: " + newCart.length);
          newCart = arrayRemove(newCart,newCart[i]["bookId"]);
          console.log("Length after: " + newCart.length);
          setCart([...newCart]);
        }
      }
      console.log(cart);

  }

  const handleDel =(e)=>{
    let newCart = cart;
    for(var i = 0; i < newCart.length; i++)
      {
        console.log(e.target.value);

        if(newCart[i]["bookId"] == e.target.value)
        {
          newCart = arrayRemove(newCart,newCart[i]["bookId"]);
          setCart([...newCart]);

        }


      }
      console.log(cart);

  }

  const handleSubmit =(e)=>{
    if(cart.length !=0){
      let bookCopies = [];


      for(var i = 0; i < cart.length; i++)
        {
          bookCopies.push(
            {
              "book": {
                  "bookId": cart[i]["bookId"]
              },
              "copies": cart[i]["copies"]
          }
          )
        }
      let message = {
        "transactionDateTime": "2022-02-11T09:15:23",
        "transactionType": "BORROW",
        "loaner": {
          "loanerId": id
        },
        "librarian": {
          "librarianId": librarianId
        },
        "bookCopies": bookCopies

      }
      console.log(message);

      postCall('api/transactions?borrowDate=20220211&dueDate=20220411', message);
      window.alert("Transaction complete");
      setCart([]);

        console.log(bookCopies);
    }
    else{
      window.alert("No Submission Needed for Empty Cart");
    }

  }

  return (
    <div className='row'>
      <div className='col-lg-5'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' width='50%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Copies</th>
                    <th>To Cart</th>

                  </tr>
                </thead>
                <tfoot>
                  <tr>
                  <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Copies</th>
                    <th>Add to Cart</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((dataItem) => {
                    let { bookId, title } = dataItem["book"];
                    let {copies}= dataItem;



                    return (
                      <tr key={bookId}>
                        <td>

                            {bookId}

                        </td>
                        <td>{title}</td>
                        <td>{copies}</td>
                        <td><button onClick={(e) => handleAdd(e)} value={bookId + "@" + title + "@" + copies}  className="btn btn-secondary btn-sm">Add</button></td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>




          </div>
        </div>
      </div>



      <div className='col-lg-7'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
          <h3>Extend Date</h3>
          <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />

              <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
              </p>
            </div>
            <div className='table-responsive'>
              <h3>Cart</h3>
              <table className='table table-bordered table-hover' id='dataTable' width='50%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>Book Title</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>

                  </tr>
                </thead>
                <tfoot>
                  <tr>
                  <th>Book Title</th>
                  <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {cart.map((dataItem) => {
                    let { bookId, copies } = dataItem;



                    return (
                      <tr key={dataItem["bookId"]}>
                        <td>

                            {dataItem["title"]}

                        </td>
                        <th><button onClick={(e) => handleNeg(e)} value={bookId} className="btn btn-secondary btn-sm">-</button></th>
                        <td>{copies}</td>
                        <th><button onClick={(e) => handlePos(e)} value={bookId} className="btn btn-secondary btn-sm">+</button></th>
                        <td><button onClick={(e) => handleDel(e)} value={bookId} className="btn btn-alert btn-sm">Delete</button></td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button onClick={(e) => handleSubmit(e)} className="btn btn-primary btn-lg">Submit</button>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendCartList;
