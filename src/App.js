import React,{useState} from 'react'
import './App.css'

const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
export default function App() {
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);

  
  return (
    <div className='App'>
      <div className='mainBody'>   
        <SearchBar
          input={input}
          checked={checked}
          setInput={setInput}
          setChecked={setChecked}
        />
        <ProductsShow
          input={input}
          checked={checked}
          products={data}
        />
        </div>
      </div>
  )
}

function SearchBar({ input, setInput, checked, setChecked }) {
  
  return (
    <div className='search-section'>
      <div>
        <input type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} />
      </div>

      <label>
      <input type="checkbox"
        value={checked}
          onClick={() => setChecked(!checked)} />
        only show stocked!
      </label>
  </div>  
  )
}

function ProductsShow({ input, checked, products }) {
  let rows = {};
  let S = new Set();
  
  products= products.filter((item) => {
    let results= item.name.toLowerCase().indexOf(
        input.toLowerCase()
      ) !== -1
    return results&& (checked? item.stocked :true)
  });
  products.forEach((item) => {
    let category = item.category;
    if (!S.has(category)) {
      S.add(category);
      rows[category] = [];
      rows[category].push(
        <RowCategory key={category} category={category} />
      )
    }
    rows[category].push(
      <Row key={item.name} product={item} />
    )
  });

  let lists = [];
  for (let key in rows) {
    lists.push(rows[key]);
  }

  return (
    <table className='results-section'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>  
        </thead>
        <tbody>
          {lists}
        </tbody>
    </table>
  )
}

function RowCategory({category}) {
  return (
    <tr className='row-category'>
      <th>{category}</th>
    </tr>)
}
function Row({ product }) {
  return (
    <tr className={'row '+ (product.stocked ? '' : 'red-item')} >
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>)
}