import React from 'react';

const BookAddForm = () => {
  let customImg = '';
  let defaultImg = customImg || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

  return (
    <div>
      <div className='card shadow mb-4 text-dark p-3'>
        <div className='card-body'>
          <form>
            <div className='row'>
              <div className='col-md-8'>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formSchoolId'>ISBN</label>
                    <div className='input-group'>
                      <input type='text' className='form-control' placeholder='156838517X' />
                      <div className='input-group-append'>
                        <button className='btn btn-primary' type='button'>
                          <i className='fas fa-search'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formQuantity'>Total copies</label>
                    <input type='number' className='form-control' placeholder='5' min='0' required />
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formQuantity'>Available copies</label>
                    <input type='number' className='form-control' placeholder='3' min='0' required />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formRetailPrice'>Retail price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input type='number' className='form-control' placeholder='10.99' min='0' step='0.01' required />
                    </div>
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='formLibraryPrice'>Library Price</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>$</span>
                      </div>
                      <input type='number' className='form-control' placeholder='6.99' min='0' step='0.01' required />
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <label htmlFor='formSection'>Section in library</label>
                    <input type='text' className='form-control' placeholder='Children self-help' />
                  </div>
                  <div className='form-group col-md-8'>
                    <label htmlFor='formImageLink'>Image link</label>
                    <input type='text' className='form-control' placeholder='http://books.google.com/books/content?id=_THywAEACAAJ&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;source=gbs_api' />
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='card shadow o-hidden' style={{ height: '300px' }}>
                  <div className='card-body p-0'>
                    <img className='card-img-top' alt='' src={defaultImg} style={{ height: '100%', objectFit: 'scale-down' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-5'>
                <label htmlFor='formTitle'>Title</label>
                <input type='text' className='form-control' placeholder="The Parent's Book about Bullying" />
              </div>
              <div className='form-group col-md-7'>
                <label htmlFor='formSubtitle'>Subtitle</label>
                <input type='text' className='form-control' placeholder="Changing the Course of Your Child's Life" />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-8'>
                <label htmlFor='formAuthor'>Author(s)</label>
                <input type='text' className='form-control' placeholder='William Voors' />
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='formLanguage'>Language</label>
                <input type='text' className='form-control' placeholder='English' />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formPublisher'>Publisher</label>
                <input type='text' className='form-control' placeholder='Hazelden Publishing' />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formYear'>Year of publication</label>
                <input type='text' className='form-control' placeholder='2000' />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='formEdition'>Edition</label>
                <input type='text' className='form-control' placeholder='1' />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formTags'>Tags</label>
                <input type='text' className='form-control' placeholder='family, relationships' />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='formNotes'>Additional notes</label>
                <textarea type='textarea' className='form-control' rows='5' placeholder='Additional information' />
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
