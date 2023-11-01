import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCountryByName } from "../domain/api";
import Container from "../styles/detail.module.scss";

function DetailPage(){
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  
    const [detailCountry, setDetailCountry] = useState();
    const { countryName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const getDetailData = async () => {
        try {
          const data = await getCountryByName(countryName.toLowerCase());
          setDetailCountry(data);
        } catch (error) {
          // Handle error here
        }
      };
      getDetailData()
    }, [countryName])

    if(detailCountry){
        return(
            <>
          <div className={Container.detailContainer}>
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "black",
                border: "1px solid black",
                width: "150px",
                marginRight: "800px",
                '@media (max-width: 768px)': {
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block"
              }
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
          <div className={Container.detailContent}>
            <div className={Container.detailcontainerimg}>
              <img
                className={Container.detailImage}
                src={detailCountry?.flags.svg}
                alt="flags"
              />
            </div>
            <div className={Container.parent}>
              <div className={Container.detailName}>
                <h1>{detailCountry?.name.common}</h1>
              </div>
              <div className={Container.detailItem}>
                <div>
                  <strong>Native Name:</strong> {detailCountry?.name.official}
                </div>
                <div>
                  <strong>Population:</strong> {detailCountry?.population}
                </div>
                <div>
                  <strong>Region:</strong> {detailCountry?.region}
                </div>
                <div>
                  <strong>Sub Region:</strong> {detailCountry?.subregion}
                </div>
                <div>
                  <strong>Capital:</strong> {detailCountry?.capital[0]}
                </div>
              </div>
              <div className={Container.detailItem}>
                <div>
                  <strong>Top Level Domain:</strong> {detailCountry?.tld[0]}
                </div>
                <div>
                  <strong>Currencies:</strong> {Object.values(detailCountry.currencies).map(currency => currency.name).join(', ')}
                </div>
                <div>
                  <strong>Languages:</strong> {Object.values(detailCountry.languages).join(', ')}
                </div>
              </div>
              <div className={Container.detailFooter}>
                <div>
                  <strong>Border Countries:</strong>
                </div>
                {detailCountry?.borders ? (
                  <div className={Container.bordersDetail}>
                    {detailCountry.borders.map((item) => {
                      return <div key={detailCountry?.name.common} className={Container.bordersItem}>{item}</div>;
                    })}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
        </div> 
            </>
        )
    }
}
export default DetailPage