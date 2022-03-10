import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';

function get_book_details(isbn_number) {
  let isbn_number_formatted = isbn_number.trim().replaceAll('-', '');
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_number_formatted}`;

  let details = fetch(url)
    .then((response) => response.json())
    .catch((error) => console.warn(error));

  return details;
}

const BookAddForm = () => {
  let navigate = useNavigate();
  let defaultImg = `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

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

  // tagString to temporary hold the comma separated tags before tagArray is sent to postCall
  const [tagString, setTagString] = useState('');

  async function isbnPrepopulate() {
    let messageSpan = document.getElementById('isbnMessage');
    let isbnSearchInput = document.getElementById('formIsbn');

    if (isbnSearchInput.value === '') {
      messageSpan.innerHTML = 'Enter ISBN before searching!';
      messageSpan.setAttribute('display', 'inline');
      messageSpan.className = 'px-4 text-danger';
    } else {
      messageSpan.innerHTML = '';

      const fetchedDetails = await get_book_details(isbnSearchInput.value);

      if (fetchedDetails['totalItems'] === 0) {
        messageSpan.innerHTML = 'Details not found! Please fill manually.';
        messageSpan.setAttribute('display', 'inline');
        messageSpan.className = 'px-4 text-danger';
      } else {
        messageSpan.innerHTML = 'Details populated! You may edit them accordingly.';
        messageSpan.setAttribute('display', 'inline');
        messageSpan.className = 'px-4 text-success';

        let filledDetails = {
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
        };

        const theVolumeDetail = fetchedDetails['items'][0]['volumeInfo'];
        let possibleISBNIinfo = theVolumeDetail['industryIdentifiers'] || '';

        for (let i = 0; i < possibleISBNIinfo.length; i++) {
          if (possibleISBNIinfo[i]['type'] === 'ISBN_10') {
            filledDetails['isbn_10'] = possibleISBNIinfo[i]['identifier'];
          }

          if (possibleISBNIinfo[i]['type'] === 'ISBN_13') {
            filledDetails['isbn_13'] = possibleISBNIinfo[i]['identifier'];
          }
        }

        if (theVolumeDetail['imageLinks'] !== undefined) {
          filledDetails['imageLink'] = theVolumeDetail['imageLinks']['thumbnail'] || '';
        }

        filledDetails['title'] = theVolumeDetail['title'] || '';
        filledDetails['subtitle'] = theVolumeDetail['subtitle'] || '';
        filledDetails['authors'] = theVolumeDetail['authors'].toString() || '';
        filledDetails['language'] = theVolumeDetail['language'] || '';
        filledDetails['publisher'] = theVolumeDetail['publisher'] || '';
        filledDetails['year'] = theVolumeDetail['publishedDate'] || '';

        setDetails(filledDetails);
      }
    }
  }

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

    if (details['imageLink'] === defaultImg) {
      sendDetails = { ...details, imageLink: '' };
    }

    postCall('/api/books', sendDetails).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        setDetails({
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

        document.getElementById('isbnMessage').innerHTML = '';
        document.getElementById('isbnMessage').className = 'px-4';
        document.getElementById('formIsbn').value = '';
        setTagString('');
      }
    });
  }

  return (
    <div>
      <div className='card shadow mb-4 text-dark p-3'>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
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
                    <input
                      type='text'
                      id='formIsbn10'
                      className='form-control'
                      placeholder='156838517X'
                      min='0'
                      maxLength='250'
                      value={details['isbn_10']}
                      onChange={(e) => {
                        setDetails({ ...details, isbn_10: e.target.value });
                      }}
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formIsbn13'>ISBN-13</label>
                    <input
                      type='text'
                      id='formIsbn13'
                      className='form-control'
                      placeholder='9781568385174'
                      min='0'
                      maxLength='250'
                      value={details['isbn_13']}
                      onChange={(e) => {
                        setDetails({ ...details, isbn_13: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formTotalQty'>Total copies</label>
                    <input
                      type='number'
                      id='formTotalQty'
                      className='form-control'
                      placeholder='5'
                      min='0'
                      maxLength='250'
                      required
                      value={details['totalQuantity']}
                      onChange={(e) => {
                        setDetails({ ...details, totalQuantity: e.target.value });
                      }}
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formAvailableQty'>Available copies</label>
                    <input
                      type='number'
                      id='formAvailableQty'
                      className='form-control'
                      placeholder='3'
                      min='0'
                      maxLength='250'
                      required
                      value={details['availableQuantity']}
                      onChange={(e) => {
                        setDetails({ ...details, availableQuantity: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formRetailPrice'>Retail price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input
                        type='number'
                        id='formRetailPrice'
                        className='form-control'
                        placeholder='10.99'
                        min='0'
                        maxLength='250'
                        step='0.01'
                        value={details['priceRetail']}
                        onChange={(e) => {
                          setDetails({ ...details, priceRetail: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formLibraryPrice'>Library Price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input
                        type='number'
                        id='formLibraryPrice'
                        className='form-control'
                        placeholder='6.99'
                        min='0'
                        maxLength='250'
                        step='0.01'
                        value={details['priceLibrary']}
                        onChange={(e) => {
                          setDetails({ ...details, priceLibrary: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <label htmlFor='formSection'>Section in library</label>
                    <input
                      type='text'
                      id='formSection'
                      maxLength='250'
                      className='form-control'
                      placeholder='Section AB12'
                      value={details['librarySection']}
                      onChange={(e) => {
                        setDetails({ ...details, librarySection: e.target.value });
                      }}
                    />
                  </div>
                  <div className='form-group col-md-8'>
                    <label htmlFor='formImageLink'>Image link</label>

                    <div className='input-group'>
                      <input
                        type='text'
                        id='formImageLink'
                        className='form-control'
                        maxLength='250'
                        placeholder='http://books.google.com/books/content?id=_THywAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
                        value={details['imageLink']}
                        onChange={(e) => {
                          setDetails({ ...details, imageLink: e.target.value });
                        }}
                      />
                      <div className='input-group-append' style={{ cursor: 'pointer' }}>
                        <span
                          className='input-group-text'
                          onClick={() => {
                            setDetails({ ...details, imageLink: defaultImg });
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
                    <img id='formThumbnail' className='card-img-top' alt='' src={details['imageLink']} style={{ height: '100%', objectFit: 'scale-down' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-5'>
                <label htmlFor='formTitle'>Title</label>
                <input
                  type='text'
                  id='formTitle'
                  className='form-control'
                  placeholder="The Parent's Book about Bullying"
                  maxLength='250'
                  value={details['title']}
                  onChange={(e) => {
                    setDetails({ ...details, title: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-7'>
                <label htmlFor='formSubtitle'>Subtitle</label>
                <input
                  type='text'
                  id='formSubtitle'
                  className='form-control'
                  placeholder="Changing the Course of Your Child's Life"
                  maxLength='250'
                  value={details['subtitle']}
                  onChange={(e) => {
                    setDetails({ ...details, subtitle: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-8'>
                <label htmlFor='formAuthor'>Author(s)</label>
                <input
                  type='text'
                  id='formAuthor'
                  className='form-control'
                  placeholder='William Voors'
                  maxLength='250'
                  value={details['authors']}
                  onChange={(e) => {
                    setDetails({ ...details, authors: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='formLanguage'>Language</label>
                <input
                  type='text'
                  id='formLanguage'
                  className='form-control'
                  placeholder='English'
                  maxLength='250'
                  value={details['language']}
                  onChange={(e) => {
                    setDetails({ ...details, language: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formPublisher'>Publisher</label>
                <input
                  type='text'
                  id='formPublisher'
                  className='form-control'
                  placeholder='Hazelden Publishing'
                  maxLength='250'
                  value={details['publisher']}
                  onChange={(e) => {
                    setDetails({ ...details, publisher: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formYear'>Year of publication</label>
                <input
                  type='text'
                  id='formYear'
                  className='form-control'
                  placeholder='2000'
                  maxLength='250'
                  value={details['year']}
                  onChange={(e) => {
                    setDetails({ ...details, year: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formEdition'>Edition</label>
                <input
                  type='text'
                  id='formEdition'
                  className='form-control'
                  placeholder='1'
                  maxLength='250'
                  value={details['edition']}
                  onChange={(e) => {
                    setDetails({ ...details, edition: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-12'>
                <label htmlFor='formTags'>Tags (comma separated)</label>
                <input
                  type='text'
                  id='formTags'
                  className='form-control'
                  placeholder='family, relationships'
                  maxLength='250'
                  value={tagString}
                  onChange={(e) => {
                    // setDetails({ ...details, tags: e.target.value });
                    setTagString(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formNotes'>Additional notes</label>
                <textarea
                  type='textarea'
                  id='formNotes'
                  className='form-control'
                  rows='5'
                  placeholder='Additional information'
                  maxLength='250'
                  value={details['notes']}
                  onChange={(e) => {
                    setDetails({ ...details, notes: e.target.value });
                  }}
                />
              </div>
            </div>

            <button type='submit' className='btn btn-primary my-2'>
              Add book
            </button>
            <button
              type='button'
              className='btn btn-outline-danger mx-4 my-2'
              onClick={() => {
                let path = `/home`;
                navigate(path);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAddForm;
