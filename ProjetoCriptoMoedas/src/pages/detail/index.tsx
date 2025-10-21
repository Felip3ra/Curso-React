import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { coinProp } from "../home";
import styles from './detail.module.css'

interface ResponseData {
    data: coinProp;
}

interface ErrorData {
    error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {
    const { cripto } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [coin, setCoin] = useState<coinProp>();
    useEffect(() => {
        async function getCoin() {
            try {
                fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=7cc57ca96ff27f448c6f960eba556219dcada23b08248d7ea84410a993cb3ff1`)
                    .then(response => response.json())
                    .then((data: DataProps) => {
                        if ("error" in data) {
                            navigate("/");
                        }

                        const price = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD"
                        })

                        const priceCompact = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact"
                        })

                        const resultData = {
                            ...data.data,
                            formatedPrice: price.format(Number(data.data.priceUsd)),
                            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
                        }
                        setCoin(resultData)
                        setLoading(false);
                    })
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        getCoin()
    }, [cripto])

    if(loading || !coin){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando detalhes...</h4>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.center}>{coin?.name}</h1>
            <h1 className={styles.center}>{coin?.symbol}</h1>

            <section className={styles.content}>
                <img
                className={styles.logo}
                src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                />
                <h1>
                    {coin?.name} | {coin?.symbol}
                </h1>
                <p><strong>Preco: </strong>{coin?.formatedPrice}</p>

                <a>
                    <strong>Mercado: </strong>{coin?.formatedMarket}
                </a>

                <a>
                    <strong>Volume: </strong>{coin?.formatedVolume}
                </a>

                <a>
                    <strong>Mudanca 24h: </strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.Profit : styles.Loss}>{Number(coin?.changePercent24Hr).toFixed(2)}</span>
                </a>
            </section>
        </div>
    );
}