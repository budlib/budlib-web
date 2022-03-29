import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { putCall } from '../helpers/putCall';

const BookEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  let bookDetailUrl = `/api/books/${id}`;
  const { loading: loadStatus, data: existingDetails } = useFetch(bookDetailUrl);

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

  useEffect(() => {
    setDetails({
      title: existingDetails['title'] || '',
      subtitle: existingDetails['subtitle'] || '',
      authors: existingDetails['authors'] || '',
      publisher: existingDetails['publisher'] || '',
      edition: existingDetails['edition'] || '',
      year: existingDetails['year'] || '',
      language: existingDetails['language'] || '',
      isbn_10: existingDetails['isbn_10'] || '',
      isbn_13: existingDetails['isbn_13'] || '',
      librarySection: existingDetails['librarySection'] || '',
      totalQuantity: existingDetails['totalQuantity'],
      availableQuantity: existingDetails['availableQuantity'],
      notes: existingDetails['notes'] || '',
      tags: existingDetails['tags'] || [],
      imageLink: existingDetails['imageLink'] || defaultImg,
      priceRetail: existingDetails['priceRetail'] || '',
      priceLibrary: existingDetails['priceLibrary'] || '',
    });

    let tempTagString = '';

    existingDetails['tags']?.map((eachTag) => {
      tempTagString += eachTag['tagName'] + ', ';
    });

    setTagString(tempTagString);
  }, [loadStatus]);

  function handleSubmit(e) {
    e.preventDefault();

    // fix tags list
    let tempTagArray = tagString.split(',');
    let finalTagArray = [];

    tempTagArray.map((eachTag) => {
      let eachTagTrim = eachTag.trim();
      eachTagTrim !== '' ? finalTagArray.push({ tagName: eachTagTrim }) : console.log('Skipping empty tag');
    });

    let sendDetails = { ...details, tags: finalTagArray };

    // creates problems with tags
    // if (details['imageLink'] === defaultImg) {
    //   sendDetails = { ...details, imageLink: '' };
    // }

    putCall(bookDetailUrl, sendDetails).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        let path = `/books/${id}/view`;
        navigate(path);
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
                    <select
                      id='formSection'
                      className='form-control'
                      placeholder='Section AB12'
                      value={details['librarySection']}
                      onChange={(e) => {
                        setDetails({ ...details, librarySection: e.target.value });
                      }}
                    >
                      <option value='PARENT_LIBRARY'>PARENT_LIBRARY</option>
                      <option value='FACULTY_LIBRARY'>FACULTY_LIBRARY</option>
                      <option value='CLASS_SETS'>CLASS_SETS</option>
                      <option value='CHILDREN_LIBRARY'>CHILDREN_LIBRARY</option>
                    </select>
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
                <div className='o-hidden' style={{ height: '300px', width: '230px' }}>
                  <img id='formThumbnail' className='card-img-top img-thumbnail' alt='' src={details['imageLink']} style={{ height: '100%', objectFit: 'scale-down' }} />
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
              Update
            </button>
            <button
              type='button'
              className='btn btn-outline-danger mx-4 my-2'
              onClick={() => {
                let path = `/books/${id}/view`;
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

export default BookEditForm;
