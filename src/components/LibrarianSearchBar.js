import React from 'react';
import { useEffect, useState } from 'react';
function LibrarianSearchBar(props) {
    const [filterOption, setfilterOption] = useState("");

    const [filterText, setfilterText] = useState("");


    const handleFilter = (e) => {
        setfilterOption(e.target.value);
        console.log(filterOption);


    };

    const handleFilterText = (e) => {
        setfilterText(e.target.value);
        console.log(filterText);



    };

    const handleSearch = (e) => {

        props.func([filterOption, filterText]);


    };


    return(


        filterOption,
        filterText,

        <React.Fragment>
            <div className="container">
            </div>

            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Search For</label>
                <select onChange={(e) => handleFilter(e)} value={filterOption} className="form-select" id="selectFilter" >
                    <option value="">No Filter</option>
                    <option value="id">ID</option>
                    <option value="userName">User Name</option>
                    <option value="email">Email Address</option>
                    <option value="role">Role</option>

                </select>
            </div>

            <div className="input-group mb-3">
                < input type="text" id="inputFilter" onChange={(e) => handleFilterText(e)} value={filterText} className="form-control" placeholder="Enter Your Search Term Here" aria-label="Enter Your Search Term Here" aria-describedby="basic-addon2" />
                <button
              type='button'
              onClick={(e) => handleSearch(e)}
              className='btn btn-primary'

            >
              Search
            </button>
            </div>
        </React.Fragment>

    );


}export default LibrarianSearchBar;