import { ITranslations } from "@/interfaces/interface";
import { DictionaryService } from "@/services/dictionary.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
//@ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import { UpdateTranslation } from "./UpdateTranslation";
interface TranslateItemProps {
  translateItem: ITranslations;
}
export function TranslateItem({ translateItem }: TranslateItemProps) {
  const [modalUpdateTranslationActive, setModalUpdateTranslationActive] = useState<boolean>(false);
  const router = useRouter();
  const mutation = useMutation({ mutationFn: DictionaryService.deleteDictionary });
  const deleteById = async () => {
    await mutation.mutate({ _id: translateItem._id });
    router.reload();
  };
  const { speak, voices } = useSpeechSynthesis();

  return (
    <div className="dictionary__item">
      <div className="dictionary__action">
        <div className="dictionary__word">{translateItem.word}</div>
        <div className="dictionary__form">
          <button className="dictionary__delete" onClick={() => speak({ text: translateItem.word, voice: voices[5] })}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.0667 14.6667C23.0667 18.6667 19.6801 21.4667 16.0001 21.4667C12.3201 21.4667 8.93341 18.6667 8.93341 14.6667H6.66675C6.66675 19.2133 10.2934 22.9733 14.6667 23.6267V28H17.3334V23.6267C21.7067 22.9733 25.3334 19.2133 25.3334 14.6667M14.4001 6.53332C14.4001 5.65332 15.1201 4.93332 16.0001 4.93332C16.8801 4.93332 17.6001 5.65332 17.6001 6.53332L17.5867 14.8C17.5867 15.68 16.8801 16.4 16.0001 16.4C15.1201 16.4 14.4001 15.68 14.4001 14.8M16.0001 18.6667C17.0609 18.6667 18.0784 18.2452 18.8285 17.4951C19.5787 16.7449 20.0001 15.7275 20.0001 14.6667V6.66666C20.0001 5.60579 19.5787 4.58838 18.8285 3.83823C18.0784 3.08808 17.0609 2.66666 16.0001 2.66666C14.9392 2.66666 13.9218 3.08808 13.1717 3.83823C12.4215 4.58838 12.0001 5.60579 12.0001 6.66666V14.6667C12.0001 15.7275 12.4215 16.7449 13.1717 17.4951C13.9218 18.2452 14.9392 18.6667 16.0001 18.6667Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="dictionary__update"
            onClick={e => {
              e.preventDefault();
              setModalUpdateTranslationActive(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V15q0-.425.288-.712T9 14q.425 0 .713.288T10 15v4q0 .425-.288.713T9 20H5q-.425 0-.712-.288T4 19q0-.425.288-.712T5 18h1.75l-.4-.35q-1.3-1.15-1.825-2.625T4 12.05Q4 9.7 5.2 7.787T8.425 4.85q.35-.2.738-.025t.512.575q.125.375-.012.75t-.488.575q-1.45.8-2.312 2.213T6 12.05m12-.1q0-1.125-.425-2.187T16.25 7.8L16 7.55V9q0 .425-.288.713T15 10q-.425 0-.712-.288T14 9V5q0-.425.288-.712T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6h-1.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.35-1.2 4.263t-3.225 2.937q-.35.2-.737.025t-.513-.575q-.125-.375.013-.75t.487-.575q1.45-.8 2.313-2.212T18 11.95"
              />
            </svg>
          </button>
          <button className="dictionary__delete" onClick={deleteById}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM7 6v13z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="dictionary__translations">
        {translateItem?.translations.length > 0 &&
          translateItem.translations.map((el: string, index: number) => (
            <div className="dictionary__translate" key={el + index}>
              {el}
            </div>
          ))}
      </div>
      <UpdateTranslation active={modalUpdateTranslationActive} setActive={setModalUpdateTranslationActive} translation={translateItem} />
    </div>
  );
}
