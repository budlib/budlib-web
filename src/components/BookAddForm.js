import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';
import { useTranslation } from 'react-i18next';

function get_book_details(isbn_number) {
  let isbn_number_formatted = isbn_number.trim().replaceAll('-', '');
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_number_formatted}`;

  let details = fetch(url)
    .then((response) => response.json())
    .catch((error) => console.warn(error));

  return details;
}

const BookAddForm = () => {
  const { t } = useTranslation('books');

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
    librarySection: 'CHILDREN_LIBRARY',
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
      messageSpan.innerHTML = t('enterIsbn');
      messageSpan.setAttribute('display', 'inline');
      messageSpan.className = 'px-4 text-danger';
    } else {
      messageSpan.innerHTML = '';

      const fetchedDetails = await get_book_details(isbnSearchInput.value);

      if (fetchedDetails['totalItems'] === 0) {
        messageSpan.innerHTML = t('detailsNotFound');
        messageSpan.setAttribute('display', 'inline');
        messageSpan.className = 'px-4 text-danger';
      } else {
        messageSpan.innerHTML = t('detailsPopulated');
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
          librarySection: 'CHILDREN_LIBRARY',
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
    let tempTagArray = tagString.split(',');
    let finalTagArray = [];

    tempTagArray?.map((eachTag) => {
      let eachTagTrim = eachTag.trim();
      eachTagTrim !== '' ? finalTagArray.push({ tagName: eachTagTrim }) : console.log('Skipping empty tag');
    });

    let sendDetails = { ...details, tags: finalTagArray };

    // creates problems with tags
    // if (details['imageLink'] === defaultImg) {
    //   sendDetails = { ...details, imageLink: '' };
    // }

    postCall('/api/books', sendDetails).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`createResp.${status}`, 'createResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
        window.location.reload();
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
                    <label htmlFor='formIsbn'>{t('preFill')}</label>
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
                    <label htmlFor='formIsbn10'>{t('isbn10')}</label>
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
                    <label htmlFor='formIsbn13'>{t('isbn13')}</label>
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
                    <label htmlFor='formTotalQty'>{t('totalCopies')}</label>
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
                    <label htmlFor='formAvailableQty'>{t('availableCopies')}</label>
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
                    <label htmlFor='formRetailPrice'>{t('retailPrice')}</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>{t('currencySymbol')}</span>
                      </div>
                      <input
                        type='number'
                        id='formRetailPrice'
                        className='form-control'
                        placeholder={t('retailPlaceholder')}
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
                    <label htmlFor='formLibraryPrice'>{t('libraryPrice')}</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>{t('currencySymbol')}</span>
                      </div>
                      <input
                        type='number'
                        id='formLibraryPrice'
                        className='form-control'
                        placeholder={t('retailPlaceholder')}
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
                    <label htmlFor='formSection'>{t('section')}</label>
                    <select
                      id='formSection'
                      className='form-control'
                      defaultValue='CHILDREN_LIBRARY'
                      onChange={(e) => {
                        setDetails({ ...details, librarySection: e.target.value });
                      }}
                    >
                      <option value='PARENT_LIBRARY'>{t('PARENT_LIBRARY')}</option>
                      <option value='FACULTY_LIBRARY'>{t('FACULTY_LIBRARY')}</option>
                      <option value='CLASS_SETS'>{t('CLASS_SETS')}</option>
                      <option value='CHILDREN_LIBRARY'>{t('CHILDREN_LIBRARY')}</option>
                    </select>
                  </div>
                  <div className='form-group col-md-8'>
                    <label htmlFor='formImageLink'>{t('image')}</label>

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
                <label htmlFor='formTitle'>{t('title')}</label>
                <input
                  type='text'
                  id='formTitle'
                  className='form-control'
                  placeholder={t('titlePlaceholder')}
                  maxLength='250'
                  value={details['title']}
                  onChange={(e) => {
                    setDetails({ ...details, title: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-7'>
                <label htmlFor='formSubtitle'>{t('subtitle')}</label>
                <input
                  type='text'
                  id='formSubtitle'
                  className='form-control'
                  placeholder={t('subtitlePlaceholder')}
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
                <label htmlFor='formAuthor'>{t('authors')}</label>
                <input
                  type='text'
                  id='formAuthor'
                  className='form-control'
                  placeholder={t('authorsPlaceholder')}
                  maxLength='250'
                  value={details['authors']}
                  onChange={(e) => {
                    setDetails({ ...details, authors: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='formLanguage'>{t('language')}</label>
                <input
                  type='text'
                  id='formLanguage'
                  className='form-control'
                  placeholder={t('languagePlaceholder')}
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
                <label htmlFor='formPublisher'>{t('publisher')}</label>
                <input
                  type='text'
                  id='formPublisher'
                  className='form-control'
                  placeholder={t('publisherPlaceholder')}
                  maxLength='250'
                  value={details['publisher']}
                  onChange={(e) => {
                    setDetails({ ...details, publisher: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formYear'>{t('yearOfPub')}</label>
                <input
                  type='text'
                  id='formYear'
                  className='form-control'
                  placeholder={t('yearOfPubPlaceholder')}
                  maxLength='250'
                  value={details['year']}
                  onChange={(e) => {
                    setDetails({ ...details, year: e.target.value });
                  }}
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formEdition'>{t('edition')}</label>
                <input
                  type='text'
                  id='formEdition'
                  className='form-control'
                  placeholder={t('editionPlaceholder')}
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
                <label htmlFor='formTags'>{t('tagsCommaSep')}</label>
                <input
                  type='text'
                  id='formTags'
                  className='form-control'
                  placeholder={t('tagsPlaceholder')}
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
                <label htmlFor='formNotes'>{t('notes')}</label>
                <textarea
                  type='textarea'
                  id='formNotes'
                  className='form-control'
                  rows='5'
                  placeholder={t('notesPlaceholder')}
                  maxLength='250'
                  value={details['notes']}
                  onChange={(e) => {
                    setDetails({ ...details, notes: e.target.value });
                  }}
                />
              </div>
            </div>

            <button type='submit' className='btn btn-primary my-2'>
              {t('add')}
            </button>
            <button
              type='button'
              className='btn btn-outline-danger mx-4 my-2'
              onClick={() => {
                let path = `/home`;
                navigate(path);
              }}
            >
              {t('cancel')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAddForm;
