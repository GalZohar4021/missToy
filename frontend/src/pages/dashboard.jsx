import { useEffect, useState } from "react"
import { PieChart } from "../cmps/pie-chart"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"
import { loadToys } from "../store/toy.actions"
import { store } from "../store/store"
import { SET_IS_LOADING } from "../store/app.reducer"

export function Dashboard() {

    const labels = toyService.getLabels()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const [data, setData] = useState({})

    useEffect(() => {
        loadToys()

    }, [])

    useEffect(() => {
        setData(getPieData())

    }, [toys])

    useEffect(() => {

    }, [data])

    function getPieData() {
        const labelsObjMap = {}
        labels.map(label => {
            labelsObjMap[label] = 0
            toys.map(toy => {
                if (toy.labels.includes(label)) {
                    labelsObjMap[label]++
                }
            })
        })
        console.dir(labelsObjMap)
        console.dir(labels.map(label => label))

        return {
            labels: labels.map(label => label),
            datasets: [
                {
                    label: 'Number of toys',
                    data: labels.map(label => labelsObjMap[label]),
                    backgroundColor: labels.map(label => toyService.getLabelsColors(label) + '52'),
                    borderColor: labels.map(label => toyService.getLabelsColors(label) + 'BB'),
                    borderWidth: 1

                }
            ]
        }
    }

    return data?.labels ? <PieChart data={data} /> : ''

}

// export const data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };