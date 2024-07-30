import axios from "axios"
import {useEffect, useState} from "react"
import {useInView} from "react-intersection-observer"

const MyPageContractsContainer = () => {
  // 초기값 10개
  const [items, setItems] = useState(() => {
    const initItems = Array.from({length: 10}, (_, i) => i + 1)
    return initItems
  })
  // 이미지 초기값 선언
  const [images, setImages] = useState([])

  const {ref, inView} = useInView({
    rootMargin: "-100px 0px",
  })

  // id 값으로 picsum 예시 이미지를 받아오는 함수
  // 차후에 각 게시판별로 바꿔서 값을 받아오고, 카드 컴포넌트에 넣어줘야함
  const fetchImageInfo = async (id) => {
    const response = await axios.get(`https://picsum.photos/id/${id}/info`)
    return response.data
  }

  // 이미지 초기값 로드 (최초 입양 기록 페이지 로드시)
  useEffect(() => {
    const loadInitialImages = async () => {
      const initialImages = await Promise.all(
        items.map(async (item) => {
          const imageInfo = await fetchImageInfo(item)
          return imageInfo
        })
      )
      setImages(initialImages)
    }
    loadInitialImages()
  }, [])

  // inView가 바뀔때마다, 추가로 n개만큼 로드
  // 우선 10개로 선정, 차후 백엔드와 소통 후 갯수 선정 필요
  // 최초 갯수, 최대 갯수, 없을시 출력 확인 필요
  useEffect(() => {
    if (inView) {
      const loadMoreImages = async () => {
        const newItems = []
        for (let i = 1; i <= 10; i++) {
          newItems.push(items.length + i)
        }
        const newImages = await Promise.all(
          newItems.map(async (item) => {
            const imageInfo = await fetchImageInfo(item)
            return imageInfo
          })
        )
        setItems((prevItems) => [...prevItems, ...newItems])
        setImages((prevImages) => [...prevImages, ...newImages])
      }
      loadMoreImages()
    }
  }, [inView])

  return (
    <div className="flex h-full flex-col items-center">
      {/* 제목 헤더 */}
      <div className="p-5 text-4xl font-bold">내 입양 기록</div>
      <div className="flex size-full flex-wrap items-center justify-center overflow-auto">
        {/* 이미지를 기준으로 반복 */}
        {images.map((image, index) => (
          <div
            key={index}
            // ref 값이 화면에 들어왔을 때 api가 요청됨
            ref={index === images.length - 1 ? ref : null}
            className={`m-2.5 h-[425px] w-[300px] rounded-2xl border`}
          >
            <img
              src={image.download_url}
              alt={image.author}
              className="h-[250px] rounded-t-2xl"
            />
            <div className="space-y-2.5 p-2">
              <p>picsum 예시 사진 - axios 요청 API</p>
              <p>{image.id} 번</p>
              <p>{image.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPageContractsContainer
