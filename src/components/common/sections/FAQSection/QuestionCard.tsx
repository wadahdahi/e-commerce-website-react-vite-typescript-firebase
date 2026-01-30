import { type FAQ } from "../../../../type";
interface QuestionCardProps {
  index: number;
  faq: FAQ;
  length: number;
}
function QuestionCard({ index, faq, length }: QuestionCardProps) {
  return (
    <div
      className={`cursor-pointer flex flex-col justify-center 2xl:p-[60px] xl:p-[50px] p-[30px] border-2 border-dark-15 border-dashed
                 ${
                   index % 2 === 0
                     ? "border-t-0 border-l-0 sm:border-r-2 border-r-0"
                     : "border-t-0 border-l-0 sm:border-r-0 border-r-0"
                 }
              
              ${(() => {
                if (length % 2 === 0) {
                  return index === length - 1 || index === length - 2
                    ? "sm:border-b-0"
                    : "sm:border-b-2";
                } else {
                  return index === length - 1
                    ? "sm:border-b-0"
                    : "sm:border-b-2";
                }
              })()}
              `}
    >
      <div className="text-primarybg 2xl:text-2xl xl:text-xl text-lg font-medium">
        {faq.question}
      </div>
      <div className="text-gray-50 font-normal 2xl:mt-[40px] xl:mt-[30px] mt-[25px] 2xl:text-lg xl:text-base text-sm">
        {faq.answer}
      </div>
    </div>
  );
}

export default QuestionCard;
