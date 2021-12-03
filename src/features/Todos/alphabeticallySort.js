export function alphabeticallySort(array) {
    let newArray = [...array];

    newArray.sort((a, b) => {
        if (a.deadline === b.deadline) {
            return a.title - b.title;
        } else {
            return b.deadline - a.deadline;
        }
    })

    return newArray;
}