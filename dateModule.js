const getDate = () => {



    const letDate = new Date();

    const Option = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    const todayDate = letDate.toLocaleDateString("en-Us", Option)
    console.log("hello from date")

    return todayDate;
}
module.exports = getDate();