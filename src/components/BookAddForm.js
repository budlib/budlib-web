import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';
function get_book_details(isbn_number) {




  let isbn_number_formatted = isbn_number.trim().replaceAll('-', '');
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_number_formatted}`;

  let details = fetch(url)
    .then((response) => response.json())
    .catch((error) => console.warn(error));

  return details;
}

async function isbnPrepopulate() {
  let messageSpan = document.getElementById('isbnMessage');
  let isbnSearchInput = document.getElementById('formIsbn');

  if (isbnSearchInput.value === '') {
    messageSpan.innerHTML = 'Enter ISBN before searching!';
    messageSpan.setAttribute('display', 'inline');
    messageSpan.className = 'px-4 text-danger';
  } else {
    messageSpan.innerHTML = '';

    const bookDetails = await get_book_details(isbnSearchInput.value);

    if (bookDetails['totalItems'] === 0) {
      messageSpan.innerHTML = 'Details not found! Please fill manually.';
      messageSpan.setAttribute('display', 'inline');
      messageSpan.className = 'px-4 text-danger';
    } else {
      messageSpan.innerHTML = 'Details populated! You may edit them accordingly.';
      messageSpan.setAttribute('display', 'inline');
      messageSpan.className = 'px-4 text-success';

      const theVolumeDetail = bookDetails['items'][0]['volumeInfo'];
      let possibleISBNIinfo = theVolumeDetail['industryIdentifiers'] || '';

      for (let i = 0; i < possibleISBNIinfo.length; i++) {
        if (possibleISBNIinfo[i]['type'] === 'ISBN_10') {
          document.getElementById('formIsbn10').value = possibleISBNIinfo[i]['identifier'];
        }

        if (possibleISBNIinfo[i]['type'] === 'ISBN_13') {
          document.getElementById('formIsbn13').value = possibleISBNIinfo[i]['identifier'];
        }
      }

      if (theVolumeDetail['imageLinks'] !== undefined) {
        document.getElementById('formImageLink').value = theVolumeDetail['imageLinks']['thumbnail'] || '';
        document.getElementById('formThumbnail').src = theVolumeDetail['imageLinks']['thumbnail'] || '';
      }

      document.getElementById('formTitle').value = theVolumeDetail['title'] || '';
      document.getElementById('formSubtitle').value = theVolumeDetail['subtitle'] || '';
      document.getElementById('formAuthor').value = theVolumeDetail['authors'].toString() || '';
      document.getElementById('formLanguage').value = theVolumeDetail['language'] || '';
      document.getElementById('formPublisher').value = theVolumeDetail['publisher'] || '';
      document.getElementById('formYear').value = theVolumeDetail['publishedDate'] || '';
    }
  }
}

const BookAddForm = () => {
  let navigate = useNavigate();

  const [bookcontent, setBookContent] = useState({
    isb_10: '',
    isbn_13: '',
    totalQuantity: '',
    availableQuantity: '',
    priceRetail: '',
    priceLibrary: '',
    librarySection: '',
    imageLink: '',
    title: '',
    subtitle: '',
    authors: '',
    language: '',
    publisher: '',
    year: '',
    edition: '',
    tags:'',
    notes: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    let tags = [];
    let tagstr = bookcontent['tags'].split(',');
    for(var i = 0; i<tagstr.length;i++){
      tags.push(tagstr[i]);
    }
    let tempBook = bookcontent;
    tempBook['tags'] = tags;

    setBookContent(tempBook);
    if(tempBook['tags'] == ""){
      delete tempBook['tags'];
    }

    console.log(tempBook);

    postCall('/api/books', tempBook).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] == 200) {
        setBookContent({
          isb_10: '',
          isbn_13: '',
          totalQuantity: '',
          availableQuantity: '',
          priceRetail: '',
          priceLibrary: '',
          librarySection: '',
          imageLink: '',
          title: '',
          subtitle: '',
          authors: '',
          language: '',
          publisher: '',
          year: '',
          edition: '',
          tags:'',
          notes: '',
        });
      }
    });

  }

  let customImg = '';
  let defaultImg = customImg || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

  return (
    <div>
      <div className='card shadow mb-4 text-dark p-3'>
        <div className='card-body'>
          <form id='bookForm' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-8'>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn'>Pre-fill using ISBN</label>
                    <div className='input-group'>
                      <input type='text' id='formIsbn' className='form-control' placeholder='156838517X' />
                      <div className='input-group-append'>
                        <button className='btn btn-primary' type='button' onClick={isbnPrepopulate}>
                          <i className='fas fa-search'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='form-group col-md-6'
                    style={{
                      display: 'flex',
                      width: '100%',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.8rem',
                      lineHeight: '1.5',
                      color: '#6e707e',
                      backgroundColor: '#fff',
                      backgroundClip: 'padding-box',
                      alignItems: 'center',
                    }}
                  >
                    <span id='isbnMessage'></span>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn10'>ISBN-10</label>
                    <input type='text' id='formIsbn10' className='form-control' placeholder='156838517X' min='0' value={bookcontent['isb_10']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, isb_10: e.target.value });
                      }}/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn13'>ISBN-13</label>
                    <input type='text' id='formIsbn13' className='form-control' placeholder='9781568385174' min='0' value={bookcontent['isb_13']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, isb_13: e.target.value });
                      }}/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formTotalQty'>Total copies</label>
                    <input type='number' id='formTotalQty' className='form-control' placeholder='5' min='0' required value={bookcontent['totalQuantity']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, totalQuantity: e.target.value });
                      }}/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formAvailableQty'>Available copies</label>
                    <input type='number' id='formAvailableQty' className='form-control' placeholder='3' min='0' required value={bookcontent['availableQuantity']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, availableQuantity: e.target.value });
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
                      <input type='number' id='formRetailPrice' className='form-control' placeholder='10.99' min='0' step='0.01' value={bookcontent['priceRetail']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, priceRetail: e.target.value });
                      }}/>
                    </div>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formLibraryPrice'>Library Price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input type='number' id='formLibraryPrice' className='form-control' placeholder='6.99' min='0' step='0.01' value={bookcontent['priceLibrary']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, priceLibrary: e.target.value });
                      }}/>
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <label htmlFor='formSection'>Section in library</label>
                    <input type='text' id='formSection' className='form-control' placeholder='Section AB12' value={bookcontent['librarySection']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, librarySection: e.target.value });
                      }}/>
                  </div>
                  <div className='form-group col-md-8'>
                    <label htmlFor='formImageLink'>Image link</label>

                    <div className='input-group'>
                      <input
                        type='text'
                        id='formImageLink'
                        className='form-control'
                        placeholder='http://books.google.com/books/content?id=_THywAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
                        value={bookcontent['imageLink']}
                        onChange={(e) => {
                          document.getElementById('formThumbnail').src = e.target.value;
                          setBookContent({ ...bookcontent, imageLink: e.target.value });
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
                <input type='text' id='formTitle' className='form-control' placeholder="The Parent's Book about Bullying" value={bookcontent['title']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, title: e.target.value });
                      }}/>
              </div>
              <div className='form-group col-md-7'>
                <label htmlFor='formSubtitle'>Subtitle</label>
                <input type='text' id='formSubtitle' className='form-control' placeholder="Changing the Course of Your Child's Life" value={bookcontent['subtitle']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, subtitle: e.target.value });
                      }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-8'>
                <label htmlFor='formAuthor'>Author(s)</label>
                <input type='text' id='formAuthor' className='form-control' placeholder='William Voors' value={bookcontent['authors']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, authors: e.target.value });
                      }}/>
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='formLanguage'>Language</label>
                <input type='text' id='formLanguage' className='form-control' placeholder='English' value={bookcontent['language']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, language: e.target.value });
                      }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formPublisher'>Publisher</label>
                <input type='text' id='formPublisher' className='form-control' placeholder='Hazelden Publishing' value={bookcontent['publisher']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, publisher: e.target.value });
                      }}/>
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formYear'>Year of publication</label>
                <input type='text' id='formYear' className='form-control' placeholder='2000' value={bookcontent['year']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, year: e.target.value });
                      }}/>
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formEdition'>Edition</label>
                <input type='text' id='formEdition' className='form-control' placeholder='1' value={bookcontent['edition']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, edition: e.target.value });
                      }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-12'>
                <label htmlFor='formTags'>Tags (comma separated)</label>
                <input type='text' id='formTags' className='form-control' placeholder='family, relationships' value={bookcontent['tags']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, tags: e.target.value });
                      }}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formNotes'>Additional notes</label>
                <textarea type='textarea' id='formNotes' className='form-control' rows='5' placeholder='Additional information' value={bookcontent['notes']}
                      onChange={(e) => {
                        setBookContent({ ...bookcontent, notes: e.target.value });
                      }}/>
              </div>
            </div>

            <button type='submit' className='btn btn-primary my-2'>
              Add book
            </button>
            <button type='button' className='btn btn-outline-danger mx-4 my-2'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAddForm;
