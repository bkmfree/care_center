export const getNasImageUrl = (imageName: string): string => {
  // NAS 서버의 기본 URL을 환경 변수에서 가져옵니다
  const nasBaseUrl = process.env.NEXT_PUBLIC_NAS_BASE_URL || 'http://localhost:3000';
  
  // 이미지 경로 생성
  return `${nasBaseUrl}/images/${imageName}`;
}; 