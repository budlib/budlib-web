import React, { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { putCall } from '../helpers/putCall';


const BookEditForm = () => {
  let navigate = useNavigate();
  let customImg = '';
  let defaultImg = `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;
  const { id } = useParams();
  const url = '/api/books/' + id;
  const { data } = useFetch(url);



  const [details, setDetails] = useState({
    title: '',
    subtitle: '',
    authors: '',
    publisher: '',
    edition: '',
    year: '',
    language: '',
    isbn_10: '',
    isbn_13: '',
    librarySection: '',
    totalQuantity: '',
    availableQuantity: '',
    notes: '',
    tags: [],
    imageLink: defaultImg,
    priceRetail: '',
    priceLibrary: '',
  });

  console.log(details);
// let strTmp = "";
// console.log(data["tags"].length);
//   for(var i = 0; i < data["tags"].length; i++)
//       {
//         strTmp = strTmp + data["tags"][i] + ",";
//       }
//   if(data["tags"].length>1){
//     strTmp = strTmp.slice(0, -1);
//   }
  // tagString to temporary hold the comma separated tags before tagArray is sent to postCall
  const [tagString, setTagString] = useState("");

  function handleSubmit(e) {
    e.preventDefault();



    // fix tags list
    console.log(tagString);
    let tempTagArray = tagString.split(',');
    let finalTagArray = [];

    tempTagArray.map((eachTag) => {
      finalTagArray.push({ tagName: eachTag });
    });

    let sendDetails = { ...details, tags: finalTagArray };
    let tempdetails = details;
    if(tempdetails["title"]==""){
      tempdetails["title"]=data["title"];
    }

    if(tempdetails["subtitle"]==""){
      tempdetails["subtitle"]=data["subtitle"];
    }

    if(tempdetails["authors"]==""){
      tempdetails["authors"]=data["authors"];
    }

    if(tempdetails["publisher"]==""){
      tempdetails["publisher"]=data["publisher"];
    }

    if(tempdetails["edition"]==""){
      tempdetails["edition"]=data["edition"];
    }

    if(tempdetails["year"]==""){
      tempdetails["year"]=data["year"];
    }

    if(tempdetails["language"]==""){
      tempdetails["language"]=data["language"];
    }

    if(tempdetails["isbn_10"]==""){
      tempdetails["isbn_10"]=data["isbn_10"]
    }

    if(tempdetails["isbn_13"]==""){
      tempdetails["isbn_13"]=data["isbn_13"];
    }

    if(tempdetails["librarySection" ]==""){
      tempdetails["librarySection"]=data["librarySection"];
    }

    if(tempdetails["totalQuantity"]==""){
      tempdetails["totalQuantity"]=data["totalQuantity"];
    }

    if(tempdetails["availableQuantity"]==""){
      tempdetails["availableQuantity"]=data["availableQuantity"];
    }

    if(tempdetails["notes"]==""){
      tempdetails["notes"]=data["notes"];
    }

    if(tagString==""){
      tempdetails["tags"]=data["tags"];
    }

    if(tempdetails["imageLink"]==""){
      tempdetails["imageLink"]=data["imageLink"];
    }

    if(tempdetails["priceRetail"]==""){
      tempdetails["priceRetail"]=data["priceRetail"];
    }

    if(tempdetails["priceLibrary"]==""){
      tempdetails["priceLibrary"]=data["priceLibrary"];
    }





    putCall('/api/books', tempdetails).then((result) => {
      window.alert(result['data']['message']);


    });
  }

  return <React.Fragment>
    <div>
      <div className='card shadow mb-4 text-dark p-3'>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-8'>


                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn10'>ISBN-10</label>
                    <input type='text' id='formIsbn10' className='form-control' placeholder={data["isbn_10"]} min='0'
                    value={details['isbn_10']}
                    onChange={(e) => {
                      setDetails({ ...details, isbn_10: e.target.value });
                    }}/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn13'>ISBN-13</label>
                    <input type='text' id='formIsbn13' className='form-control' placeholder={data["isbn_13"]} min='0'
                    value={details['isbn_13']}
                    onChange={(e) => {
                      setDetails({ ...details, isbn_13: e.target.value });
                    }}/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formTotalQty'>Total copies</label>
                    <input type='number' id='formTotalQty' className='form-control' placeholder={data["totalQuantity"]} min='0' required
                    value={details['totalQuantity']}
                    onChange={(e) => {
                      setDetails({ ...details, totalQuantity: e.target.value });
                    }}/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formAvailableQty'>Available copies</label>
                    <input type='number' id='formAvailableQty' className='form-control' placeholder={data["availableQuantity"]} min='0' required
                    value={details['availableQuantity']}
                    onChange={(e) => {
                      setDetails({ ...details, availableQuantity: e.target.value });
                    }}/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formRetailPrice'>Retail price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input type='text' id='formRetailPrice' className='form-control' placeholder={data["priceRetail"]}
                      value={details['priceRetail']}
                      onChange={(e) => {
                        setDetails({ ...details, priceRetail: e.target.value });
                      }}/>
                    </div>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formLibraryPrice'>Library Price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input type='text' id='formLibraryPrice' className='form-control' placeholder={data["priceLibrary"]}
                      value={details['priceLibrary']}
                      onChange={(e) => {
                        setDetails({ ...details, priceLibrary: e.target.value });
                      }}/>
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <label htmlFor='formSection'>Section in library</label>
                    <input type='text' id='formSection' className='form-control' placeholder={data["librarySection"]}
                    value={details['librarySection']}
                    onChange={(e) => {
                      setDetails({ ...details, librarySection: e.target.value });
                    }}/>
                  </div>
                  <div className='form-group col-md-8'>
                    <label htmlFor='formImageLink'>Image link</label>

                    <div className='input-group'>
                      <input
                        type='text'
                        id='formImageLink'
                        className='form-control'
                        placeholder={data["imageLink"]}
                        value={details['imageLink']}

                        onChange={(e) => {
                          document.getElementById('formThumbnail').src = e.target.value;
                          setDetails({ ...details, imageLink: e.target.value });
                        }}
                      />
                      <div className='input-group-append' style={{ cursor: 'pointer' }}>
                        <span
                          className='input-group-text'
                          onClick={() => {
                            document.getElementById('formThumbnail').src = defaultImg;
                            document.getElementById('formImageLink').value = '';
                          }}
                        >
                          <i className='fas fa-undo'></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-4 px-5 pb-4 o-hidden'>
                <div className='card' style={{ height: '300px', width: '230px' }}>
                  <div className='card-body p-0'>
                    <img id='formThumbnail' className='card-img-top' alt='' src={defaultImg} style={{ height: '100%', objectFit: 'scale-down' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-5'>
                <label htmlFor='formTitle'>Title</label>
                <input type='text' id='formTitle' className='form-control' placeholder={data["title"]} value={details['title']}
                  onChange={(e) => {
                    setDetails({ ...details, title: e.target.value });
                  }}/>
              </div>
              <div className='form-group col-md-7'>
                <label htmlFor='formSubtitle'>Subtitle</label>
                <input type='text' id='formSubtitle' className='form-control' placeholder={data["subtitle"]}
                value={details['subtitle']}
                onChange={(e) => {
                  setDetails({ ...details, subtitle: e.target.value });
                }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-8'>
                <label htmlFor='formAuthor'>Author(s)</label>
                <input type='text' id='formAuthor' className='form-control' placeholder={data["authors"]}
                value={details['authors']}
                  onChange={(e) => {
                    setDetails({ ...details, authors: e.target.value });
                  }}/>
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='formLanguage'>Language</label>
                <input type='text' id='formLanguage' className='form-control' placeholder={data["language"]}
                value={details['language']}
                onChange={(e) => {
                  setDetails({ ...details, language: e.target.value });
                }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formPublisher'>Publisher</label>
                <input type='text' id='formPublisher' className='form-control' placeholder={data["publisher"]}
                value={details['publisher']}
                onChange={(e) => {
                  setDetails({ ...details, publisher: e.target.value });
                }}/>
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formYear'>Year of publication</label>
                <input type='text' id='formYear' className='form-control' placeholder={data["year"]}
                value={details['year']}
                  onChange={(e) => {
                    setDetails({ ...details, year: e.target.value });
                  }}/>
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formEdition'>Edition</label>
                <input type='text' id='formEdition' className='form-control' placeholder={data["edition"]}
                value={details['edition']}
                onChange={(e) => {
                  setDetails({ ...details, edition: e.target.value });
                }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-12'>
                <label htmlFor='formTags'>Tags (comma separated)</label>
                <input type='text' id='formTags' className='form-control' placeholder={tagString}
                value={tagString}
                onChange={(e) => {
                  // setDetails({ ...details, tags: e.target.value });
                  setTagString(e.target.value);
                }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formNotes'>Additional notes</label>
                <textarea type='textarea' id='formNotes' className='form-control' rows='5' placeholder={data["notes"]}
                value={details['notes']}
                onChange={(e) => {
                  setDetails({ ...details, notes: e.target.value });
                }}/>
              </div>
            </div>

            <button type='submit' className='btn btn-primary my-2'>
              Update book
            </button>
            <button type='button' className='btn btn-outline-danger mx-4 my-2'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </React.Fragment>;
};

export default BookEditForm;
