import { sharedConfigTypes } from '~/shared/config';
import { withTime } from '~/shared/lib/parseDate';

export const Table = ({
    filters,
    records,
    summaryByRoot,
}: sharedConfigTypes.Report) => {
    return (
        <div className="flex justify-center mt-5 items-center">
            <div className="overflow-auto w-full">
                <table className="border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={3}
                            >
                                Имя
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                                Пол
                            </th>
                            <th
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={2}
                            >
                                Дата рождения
                            </th>
                            {filters.icdRoots.map((icd) => (
                                <th
                                    key={icd}
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    {icd}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr
                                className={index % 2 === 0 ? 'bg-gray-200' : ''}
                                key={record.patientName + index}
                            >
                                <td
                                    className="border border-gray-300 px-4 py-2 text-center text-nowrap"
                                    colSpan={3}
                                >
                                    {record.patientName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {record.gender === 'Male'
                                        ? 'Мужской'
                                        : 'Женский'}
                                </td>
                                <td
                                    className="border border-gray-300 px-4 py-2 text-center"
                                    colSpan={2}
                                >
                                    {withTime(record.patientBirthdate)}
                                </td>
                                {filters.icdRoots.map((icd) => (
                                    <td
                                        key={icd + record.patientName}
                                        className="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        {record.visitsByRoot &&
                                        record.visitsByRoot[icd] !== undefined
                                            ? record.visitsByRoot[icd]
                                            : 0}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-primary-fairPink font-bold">
                            <td
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={6}
                            >
                                Итого
                            </td>
                            {Object.entries(summaryByRoot).map(
                                ([code, sum]) => (
                                    <td
                                        key={code}
                                        className="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        {sum}
                                    </td>
                                ),
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
