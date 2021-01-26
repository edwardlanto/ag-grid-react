LINK - [Vercel Bridgit Challenge](https://bridgit-challenge.vercel.app/)

## Assumptions you made during the implementation process.

#### What stack am I going to use ? 

* Ag Grid
* React
* Material UI
* React Hook Form
* Yarn

I looked at the question and I had a feeling I needed to pass state to other components, but instead of using Redux I went with something built in React Context API, saving space on dependancies. I know the concepts are practically the same so I went with that instead, though I could've set it up if needed. I am used to React Hook Form, the second I saw a form I went with that because its light & has amazing validation. I also have experience tabularizing data and I know AG Grid does wonders and is very robust. It has built in sorting, built in Grid API to select nodes & Overflow X scroll.

#### What is going to be a component?

A component should be self contained and independant of eachother. I built this project thinking of scale, meaning the form can be reusable for other pages to interact with other future grids. As for the Grid, I'd like to say its mainly a functional piece — it just needs the data so I made it reusable as well.

#### What are some real life examples that would be needed that arent in the challenge?

If I were to place this in the real world situation, I would always want my forms required & show meaningful errors where ever needed. I also thought about user experience and I wanted the "Delete" button to only show if there were rows selected, because row data I feel like is suppposed to have data or a button that does more than delete.


## What you liked or didn't like.

I liked all of it, tested core fundamentals of programming. I enjoyed putting real world thinking into this. A feature I'm proud of was I don't repeat the categories in the Select Dropdown.

``` 
  const categories = globalState?.state.originalData.map((item) => item.category);
  let categoriesSet = Array.from(new Set(categories));
```

Another feature I enjoyed building was AG grid, because it was shorter and easier to understand than Material UI's Data Grid.

``
    <AgGridReact
          rowData={globalState?.state.data}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={(params) => {
            setGridApi(params.api);
            setColumnApi(params.columnApi);
          }}
          onRowSelected={rowSelectionCallback}
          suppressHorizontalScroll={false}
          enableSorting={false}
        />
``


#### Start Project


