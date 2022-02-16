import React from 'react';
import { useEffect, useState } from 'react';
function BookSearchBar(props) {
    const [filterOption, setfilterOption] = useState("0");

    const [filterText, setfilterText] = useState("");


    const handleFilter = (e) => {
        setfilterOption(e.target.value);
        console.log(filterOption);
        props.func([filterOption, filterText]);

    };

    const handleFilterText = (e) => {
        setfilterText(e.target.value);
        console.log(filterText);
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
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="publisher">Publisher</option>
                    <option value="isbn">ISBN</option>
                    <option value="tags">Tags</option>
                </select>
            </div>

            <div className="input-group mb-3">
                < input type="text" id="inputFilter" onChange={(e) => handleFilterText(e)} value={filterText} className="form-control" placeholder="Enter Your Search Term Here" aria-label="Enter Your Search Term Here" aria-describedby="basic-addon2" />

            </div>
        </React.Fragment>

    );


}export default BookSearchBar;