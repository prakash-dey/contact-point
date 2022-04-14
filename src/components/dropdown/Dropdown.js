import React from 'react'
import { useState } from 'react'
import FontAwesome from 'react-fontawesome';
import './dropdown.css'





function Dropdown({ searchable, multiSelect, data }) {

    console.log(data);

    let listOriginal;

    // Maping the data to object
    const structureData = () => {
        const list = [...data];
        if ((typeof list[0]) === 'object') {
            list.forEach(element => {
                element.isChecked = false;
            });
        } else {
            list.forEach((element, idx) => {
                list[idx] = {};
                list[idx].title = element;
                list[idx].isChecked = false;
            });
        }
        listOriginal = [...list];
        return list;
    }

    // The required variables
    const [isListOpen, setIsListOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('Select Item');
    const [list, setList] = useState(structureData());
    const [selectAllInp, setSelectAllInp] = useState(false)
    const [searchVal, setSearchVal] = useState("");


    //   Toggling the menu list
    const toggleList = () => {
        setIsListOpen(prevState => !prevState)
    }
    const selectItem = (idx, item) => {
    
        setHeaderTitle(item.title);
        multiSelect && setList(...list, list[idx].isChecked = true);
        !multiSelect && setIsListOpen(prevState => !prevState);

    }

    // Handling the submit. As nothing was mention so I am currently consoling the selected items
    const handleSubmit = () => {
        multiSelect ? (list.forEach(element => {
            if (element.isChecked)
                console.log(element.title)
        })) : console.log(headerTitle);

        // Starting default
        
    }
// clearing the selected items
    const handleClear = () => {
        let tempList = list.map(element => {
            return { ...element, isChecked: false }
        })
        setList(tempList);
        setSelectAllInp(false);
    }


    // All select and unselect function for multiselect
    const selectClearAll = (e) => {

        const { name, checked } = e.target;
        setSelectAllInp(checked);
        console.log(name);
        let tempList = list.map(element => {
            return { ...element, isChecked: checked }
        })
        setList(tempList);
        console.log(tempList);
    }

    // Controlling the change in the form elements

    const handleChange = (e) => {

        const { name, checked } = e.target;
        console.log(name);
        let tempList = list.map(element => {
            return element.title === name ? { ...element, isChecked: checked } : element;
        })
        setList(tempList);
        // console.log(tempList);
    }


    // Filtering the data based on the search string
    const handleSearch = (e) => {
        setSearchVal(e.target.value.toUpperCase());
        console.log(e.target.value.toUpperCase());
        let tempList = listOriginal.filter((elm) =>
            elm.title.toUpperCase().includes(searchVal)
        );
        console.log(tempList);
        console.log('List', list);
        console.log('OList', listOriginal);

        setList(tempList);

    }


    // Form element

    return (
        <>

            <div className="dd-wrapper">
                <button
                    type="button"
                    className="dd-header"

                >

                    <div className="dd-header-title">{searchable ? <input
                        type={"text"}
                        className="inp searc-field"
                        value={searchVal}
                        placeholder='Search Item'
                        onChange={handleSearch}
                        onKeyUp={handleSearch} // Because backspace doesnot work 



                    /> : headerTitle}</div>
                    {isListOpen
                        ? <FontAwesome name="angle-up" size="2x" className='icon' onClick={toggleList} />
                        : <FontAwesome name="angle-down" size="2x" className='icon' onClick={toggleList} />}
                </button>
                {isListOpen && (
                    <div
                        role="list"
                        className="dd-list"
                    >{
                            multiSelect &&
                            <label>

                                <input
                                    type={"checkbox"}
                                    className="dd-list-item"
                                    // key={item.id}
                                    checked={selectAllInp}
                                    className={'inp'}
                                    onChange={selectClearAll}


                                />
                                Select All

                            </label>

                        }
                        {list.map((item, idx) => (
                            <>
                                <label className='menu-items'>

                                    <input
                                        type={multiSelect ? "checkbox" : "button"}
                                        className="dd-list-item"
                                        key={item.id}
                                        onClick={() => selectItem(idx, item)}
                                        value={""}
                                        checked={item.isChecked}
                                        onChange={handleChange}
                                        name={item.title}
                                        className={'inp'}


                                    />
                                    {item.title}

                                </label>


                            </>
                        ))}
                    </div>
                )}
                <div className="btns">
                    {
                        multiSelect && <><button type="submit" onClick={handleSubmit}>Submit</button>
                            <button type="submit" onClick={handleClear}>Clear</button></>

                    }
                </div>
            </div>



        </>
    )
}

export default Dropdown