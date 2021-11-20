import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDataMap, IDataObject, IPieData } from '../interfaces/dataInterfaces'
import { RootState } from '../store/store'
import { Pie } from 'react-chartjs-2';
import { BsFillSquareFill } from 'react-icons/bs'

const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scale: {
        ticks: {
            precision: 0
        },
    },
    aspectRatio: 1,
}

export const ExpensesBlock = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const [dataMap, setDataMap] = useState<IDataMap | null>(null)
    const [pieData, setPieData] = useState<IPieData | null>(null)

    useEffect(() => {
        if (rawData) {
            let acc: IDataMap = {}

            setDataMap(rawData.actions.reduce((dataMap, action) => {
                if (action.type === 'income') return dataMap
                if (dataMap[action.category]) {
                    dataMap[action.category].sum += +action.amount
                } else {
                    dataMap[action.category] = {
                        sum: +action.amount,
                        color: rawData.categories.find(category => category.title === action.category)?.bgColor || "#white"
                    }
                }

                return dataMap
            }, acc))
        }
    }, [rawData])

    useEffect(() => {
        if (dataMap) {
            setPieData({
                labels: Object.keys(dataMap),
                datasets: [
                    {
                        label: '# of Votes',
                        data: Object.values(dataMap).map((action: any) => action.sum),
                        backgroundColor: Object.values(dataMap).map((action: any) => action.color),
                        borderColor: Object.values(dataMap).map(() => 'rgba(0, 0, 0, 1)'),
                        borderWidth: 1,
                    },
                ],
            })
        }
    }, [dataMap])

if(dataMap){
    console.log('dataMap', Object.entries(dataMap))
}


    return (
        <div className="expenses-block keen-slider__slide">
            <div className="summery-block">
                <h2 className="summery-block-title">Expenses</h2>
                
                {pieData && <Pie data={pieData} options={pieOptions} className="pie" />}

                <div className="summery-block-details">
                    {dataMap && Object.entries(dataMap).map(action => {
                        return <div className="action-details">
                                <div className="left-side">
                                    <BsFillSquareFill className="action-color" style={{color: action[1].color}}/>
                                    <h2>{action[0]}</h2>
                                </div> 
                                <div className="right-side">
                                    <h2>{action[1].sum}{rawData.actions[0].currencySign}</h2>
                                </div> 
                               </div>
                    })}
                </div>
            </div>
            <div className="actions-block">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic laboriosam porro delectus minus necessitatibus maiores. Unde debitis adipisci repudiandae nesciunt at aspernatur nisi natus nihil perspiciatis magnam. Excepturi nihil rem nobis fugiat. Unde mollitia accusantium soluta, ipsum corporis animi aliquid natus numquam libero quis dolores, nihil voluptates fugiat pariatur laborum quidem quia nemo doloribus, facere sunt! Veniam adipisci exercitationem minima incidunt numquam nulla soluta asperiores dicta quas ullam ipsa odit repellendus amet voluptatibus inventore fugiat ipsum mollitia non aliquam, suscipit voluptatem laborum. Ipsum provident ab vel aliquam! Ipsa ex tenetur itaque debitis rerum alias voluptates asperiores, cumque repellat possimus aspernatur veritatis laborum odio reiciendis voluptate at perspiciatis inventore quis doloribus aliquam corporis ea autem? Minima nulla voluptates iste nostrum magnam at tempora quae a! Deleniti, nobis labore. Exercitationem, voluptatum. Magni consequatur obcaecati sunt accusantium tempore, voluptas dolorem laudantium libero cum, excepturi inventore voluptatum odit cumque dolorum autem corporis! Ut dicta quos animi alias modi fugiat recusandae dolore provident nobis sunt, commodi, enim quae, reiciendis qui repellat explicabo optio veritatis! Provident laborum facere vitae saepe facilis est voluptatem. Molestias quisquam esse error aspernatur sint maiores accusantium amet excepturi alias nostrum beatae voluptatem quod ipsam, a, qui doloremque sed deserunt odio repellendus. Vel, ex cum consequatur quas error, adipisci architecto harum ullam alias dolorem, accusantium soluta eveniet saepe dignissimos aperiam molestias sit sint repellat nemo consectetur quidem libero iusto esse? Provident quod voluptas ipsam laborum iste asperiores mollitia magnam quis enim fugiat iusto sit in, veritatis libero culpa officiis dolore voluptatibus placeat, numquam quia consequatur fuga aperiam. Optio reiciendis, qui perferendis tempora necessitatibus eaque alias esse libero quia commodi veritatis, sequi ipsam similique cum omnis illo saepe, maxime soluta vel? Architecto qui pariatur amet explicabo voluptates debitis suscipit perferendis laboriosam similique aliquid deserunt illo aut reprehenderit atque, earum repellendus aliquam dolor! Quae iste recusandae consectetur aliquam doloribus deserunt, quaerat reprehenderit dicta. Sit tempora doloribus explicabo exercitationem iste illo maiores. Fugiat, id quidem! Asperiores sapiente, est mollitia eveniet quas nihil eligendi maiores totam magni, saepe maxime expedita, repellendus sunt fuga neque. Culpa dolorem molestiae veritatis, autem maiores harum expedita ipsa sit? Ea enim nostrum rem dolorem nobis, repudiandae tempore saepe placeat, quasi possimus unde soluta minima quas mollitia, assumenda eligendi minus? Tempore, asperiores. Deserunt, voluptates esse eligendi incidunt ducimus, magnam est commodi porro beatae doloremque sed odio dignissimos deleniti fugiat consectetur eveniet eaque reiciendis quo amet unde. Dicta velit debitis voluptas. Aut doloremque facilis dolor officiis placeat ad obcaecati, praesentium cumque, commodi, debitis soluta? Rerum, nam sapiente facilis laudantium ipsum ducimus maiores dolorum quam ullam. Harum, adipisci quia. Tempore deleniti, quod voluptas dolore sed ut pariatur similique sapiente obcaecati eum perspiciatis accusamus quam illum molestias qui odit neque minima. Praesentium in nostrum doloribus, fugit repellat veniam voluptas, cumque vitae sed ullam quod soluta sit culpa. Magnam deserunt quis sunt aperiam. Voluptatum non animi inventore minima in aliquam, commodi fugit enim dolorem minus ad repellat quos similique? Voluptates temporibus mollitia possimus aut autem at provident necessitatibus. Perferendis ducimus illum quibusdam ratione laboriosam assumenda saepe repellendus quaerat voluptatibus rem nemo reiciendis, unde totam at accusantium architecto delectus quam modi quia neque id labore voluptatem earum! Ipsam, harum porro? Vel nisi, dicta exercitationem corrupti, eaque aliquam voluptatem aut excepturi incidunt architecto est provident nulla in nobis quas nemo. Consequuntur debitis aut possimus beatae dolorum distinctio quam iure ipsum est, maxime maiores officiis alias ullam blanditiis dignissimos eius similique rem deserunt molestiae impedit laboriosam id assumenda laborum sequi. Repudiandae sit quibusdam iste necessitatibus inventore illo quae eligendi ad dolorem! Totam dolorem illo corrupti laborum voluptates voluptatum illum fugiat sunt, unde repellendus tempore ex mollitia alias veniam. Blanditiis cupiditate voluptatibus omnis! Consequuntur deleniti voluptates vero quas at aut deserunt. Totam esse nemo adipisci? Adipisci, ipsam voluptate. Dolore, omnis distinctio reiciendis itaque adipisci ullam tenetur, consequatur voluptatum temporibus inventore, id ut necessitatibus harum. Suscipit dicta cupiditate accusamus sint hic in laboriosam optio numquam excepturi, aspernatur consequuntur earum vero, velit cum, repellendus quam porro rem assumenda reprehenderit. Enim, quo? Dolor porro et culpa aliquid labore distinctio qui enim facere dolores consectetur, nam laborum voluptatibus nemo corrupti earum architecto consequatur. Perspiciatis, accusantium! Provident architecto consectetur, esse blanditiis harum tenetur natus autem pariatur fugit rem sequi voluptates magnam adipisci explicabo minima facere dicta facilis hic delectus voluptas expedita! Minus, temporibus corporis aspernatur soluta at ipsam earum sit cum! Accusantium repellat, ea assumenda ut ullam itaque repudiandae sed quibusdam quas, officia neque fugit veritatis. Quae, sapiente obcaecati saepe harum provident necessitatibus aliquam nostrum soluta cum illum perspiciatis ducimus eum, quam animi! Eaque at esse exercitationem eveniet, ullam recusandae reiciendis eius fugit pariatur. Dolorem eius pariatur nam, ab aperiam amet vitae cum quo cupiditate doloribus, debitis enim esse? Expedita eius quibusdam aspernatur fugiat, assumenda earum nostrum, incidunt delectus blanditiis tempora ipsam exercitationem animi ipsum in excepturi dignissimos? Vitae iusto, modi cupiditate atque doloribus sunt temporibus libero necessitatibus porro, dolores sit maiores aliquid natus accusantium fugit. Rem officia maxime maiores harum, fugit animi doloremque officiis sed ullam, aliquid cupiditate. Deserunt, sapiente dicta? Quibusdam odit, illo explicabo iste ex blanditiis aliquid sapiente nisi excepturi libero! Beatae quod incidunt molestias? Officia velit sequi laboriosam temporibus distinctio aspernatur ex minus accusamus debitis non id quos ab, dolor veniam, labore nobis, quaerat impedit perferendis nostrum. Placeat laboriosam ex reiciendis vel iure praesentium blanditiis mollitia cum aliquid corrupti culpa ipsa, repudiandae esse quae sed consequatur laborum neque similique cumque quidem provident asperiores aliquam labore minima? Dolor quasi doloremque beatae laboriosam quaerat error quibusdam delectus eos, maiores facere dolorum, quo reiciendis qui ea quidem soluta cum, vitae mollitia non similique rem in nemo! Delectus recusandae enim natus nemo. Ex illum corrupti cum sunt accusantium magnam enim distinctio dolorem facilis praesentium voluptas neque saepe quas, porro exercitationem beatae non vitae sit voluptate expedita pariatur sapiente veritatis repudiandae a? Dolor ipsum fuga unde quaerat sapiente voluptas consequatur nesciunt repellendus nihil praesentium rem tempore fugit, eaque similique explicabo obcaecati. Minus, ut officiis fugit temporibus sed corporis, consequuntur maiores, officia autem commodi nulla vitae recusandae eius quae. Sint eos, corporis quod qui dolorum in incidunt.
            </div>
        </div>
    )
}
