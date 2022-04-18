
import React, {useState} from 'react'
import Header from "../../components/header/Header";
import axios from 'axios';
import { ImgDiv, MainContainer, HomeImg, } from './HomeStyles'
import homeSvg from '../../assets/home.svg'
import RecipeCardComp from './RecipeCardComp'

const APP_ID = "6c5585be"; 
const APP_KEY = "ebc5ad9e73adc995342463048cdf2660";
/****buraya kendi id ve key imizi yaziyoruz**********/

const Home = () => {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState("");
  const mealTypes=["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"]
  const [meal, setMeal] = useState(mealTypes[0].toLowerCase())
  // query=yazdığımız sorgu kelimesi, meal=breakfast vs
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${meal}`;

  // await tek başına kullanılması bir sözdizimi hatası üretecektir. Bu nedenle, async işlevinin içinde await kullanın,
  //url ye bağlandığınızda then ile devam ederseniz ok, ama kısaca axios kullanacaksak, veri çekerken beklemeyip alt satıra geçer, o yüzden bekle await diyoruz
  const getData = async () => {
    if (query) {
      const result = await axios.get(url);
      setFood(result.data.hits);
      console.log(result.data.hits);
      //sadece result ı yazdırırsak bir sürü yabancı ifade gelecek, bizim esas istediğimiz data dizisi, result ın bir alt öğesi, dataya ulaşmak için result.data
      // data nın içinde hits ve more key i var, hits =bütün dizi toplu halde json olarak, 10 tane pie mesela. data 1 den 10 a kadar göster diyor, (daha fazla varsa bile ) more =true
    } else {
      console.log("please fill the form");
    }
  };

  return (
    <div>
      <Header 
      setQuery={setQuery}
      getData={getData}
      mealTypes={mealTypes}
      setMeal={setMeal}
      />

      {food? (
        <MainContainer>
          {
            food.map((liste, index)=>(
              <RecipeCardComp key={index} recipe1={liste.recipe}/>
            ))
          }
        </MainContainer>
      ):<ImgDiv>
      <HomeImg src={homeSvg} />
      </ImgDiv>}
    </div>
  )
}

export default Home