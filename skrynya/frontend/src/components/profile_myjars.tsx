import React from "react";

export default function MyJars() {
    const arr = ["hello world",2,3,4,5]
    return (
        <div>
            <h3>My Jars</h3>
            <div>
                {arr.map((jar) => (
                    <div>{jar}</div>
                ))}
            </div>
        </div>
    )
}