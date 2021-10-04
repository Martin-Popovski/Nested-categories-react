import { useEffect, useState } from "react";
import data from "../data/data.json";
import { Category } from "../models/Category";
const cloneDeep = require("lodash.clonedeep");

const Home = () => {
  const [categoriesData, setCategoriesData] = useState<Category | null>(null);

  // Mock http request to show getting asynchronous data
  const mockHttp = (success: boolean, timeout: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve(data);
        } else {
          reject({ message: "Error" });
        }
      }, timeout);
    });
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const categories: any = await mockHttp(true, 1000);

        setCategoriesData(categories);
      } catch (e: any) {
        //Show error notification in real application
        console.log(e.message);
      }
    }
    getCategories();
  }, []);

  const addNewCategory = (category: Category) => {

    //Make a deep copy of the state
    const categoriesDataCopy = cloneDeep(categoriesData);

    updateCategories(categoriesDataCopy.categories, {...category})

    setCategoriesData(categoriesDataCopy);

    //Bonus: Print the JSON object that corresponds to the modified version of the nested structure.
    console.log("%c modified Object", "color: blue", categoriesDataCopy)
  };

  const updateCategories = (arr: Category[], category: Category) => {

    // First category name is root
    if(category.name === 'root'){
      arr.push({name: `${arr.length + 1}`, categories: []})
      return;
    }

    arr.forEach((item: any) => {
      if (item.name === category.name) {
        const categoryName = setCategoryName(category)

        item.categories = [
          ...item.categories,
          {
            name: categoryName,
            categories: [],
          },
        ];
      } else {
        updateCategories(item.categories, category);
      }
    });
  };

  const setCategoryName = ({name, categories}: Category) => {
    return `${name}.${categories.length + 1}`
  }

  const CategoryComponent = ({name, categories}: Category) => {
    const hasCategories = categories && categories.length > 0;
    const colorValue = name !== 'root' ? 255 - name.split(".").length * 10 : 255;
    const bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`

    return (
      <div className="category" style={{backgroundColor: bgColor}}>
        <span>Name: {name}</span>
        <button onClick={() => addNewCategory({name, categories})} className="category-button">+</button>
        {hasCategories &&
          categories.map((category) => (
            <CategoryComponent key={category.name} {...category} />
          ))}
      </div>
    );
  };

  return (
    <section>
      {categoriesData && <CategoryComponent {...categoriesData} />}
    </section>
  );
};

export default Home;
