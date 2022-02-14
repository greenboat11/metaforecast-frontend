import React, { useState } from "react";
import Link from "next/link";
import Layout from "./layout.js";

/* Helper functions */

let calculateLastUpdate = () => {
    let today = new Date().toISOString()
    let yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1)
    let yesterday = yesterdayObj.toISOString()
    if (today.slice(11, 16) > "02:00") {
        return today.slice(0, 10)
    } else {
        return yesterday.slice(0, 10)
    }
}

/* get Props */
export async function getStaticProps() {
    //getServerSideProps
    let lastUpdated = calculateLastUpdate() // metaforecasts.find(forecast => forecast.platform == "Good Judgment Open").timestamp
    return {
        props: {
            lastUpdated
        },
    };
}

/* Display one tool */
function displayTool({
    title,
    description,
    url,
    img,
    i
}) {
    return (

        <a href={url} passHref key={`tool-${i}`} className="hover:bg-gray-100 hover:no-underline cursor-pointer flex flex-col px-4 py-3 bg-white rounded-md shadow place-content-stretch flex-grow no-underline b-6">
            <div
                className="flex-grow items-stretch"
            >
                <div className={`text-gray-800 text-lg mb-2 font-medium `}>
                    {title}
                </div>
                <div className={`text-gray-500 mb-3 `}>
                    {description}
                </div>
                <img src={img} className={`text-gray-500 mb-2`} />
            </div>
        </a>

    );
}



export default function Tools({ lastUpdated }) {
    let tools = [

        {
            title: "Search",
            description: "Find forecasting questions on many platforms",
            url: "https://metaforecast.org",
            img: "https://i.imgur.com/UECzHlu.png"
        },
        {
            title: "Capture",
            description: "Capture forecasts save them to Imgur. Useful for posting them somewhere else as images",
            url: "capture",
            img: "https://i.imgur.com/URN4sj5.png"
        },
        {
            title: "[Upcoming] Request",
            description: "Interact with metaforecast's API and fetch forecasts for your application. Currently possible but documentation is poor, get in touch.",
        },
        {
            title: "Summon",
            description: "Summon metaforecast on Twitter by mentioning @metaforecast, or on Discord by using Fletcher and !metaforecast, followed by search terms",
            url: "https://twitter.com/metaforecast",
            img: "https://i.imgur.com/BQ4Zzjw.png"
        },
        {
            title: "[Upcoming] Dashboards",
            description: "Present forecasts in dashboards.",
        },
        {
            title: "[Upcoming] Record",
            description: "Save your forecasts or bets.",
        },

    ]
    return (
        <Layout key="tools" page="" lastUpdated={lastUpdated} captureToggle={"search"} >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                {tools.map((tool, i) => displayTool({ ...tool, i }))}
            </div>
        </Layout>
    )
}
