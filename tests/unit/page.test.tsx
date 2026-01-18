import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

describe('Home Page', () => {
  it('페이지 안내 문구가 표시된다', () => {
    render(<Home />);
    expect(screen.getByText('할일을 추가하고 관리하세요')).toBeInTheDocument();
  });

  it('할일 추가 폼이 표시된다', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('할일을 입력하세요')).toBeInTheDocument();
  });

  it('초기 상태에서 빈 목록 메시지가 표시된다', () => {
    render(<Home />);
    expect(screen.getByText('할일이 없습니다')).toBeInTheDocument();
  });

  it('할일을 추가하면 목록에 표시된다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    await user.type(titleInput, '새로운 할일');
    await user.click(addButton);

    expect(screen.getByText('새로운 할일')).toBeInTheDocument();
    expect(screen.queryByText('할일이 없습니다')).not.toBeInTheDocument();
  });

  it('할일을 완료 처리할 수 있다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // 할일 추가
    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    await user.type(titleInput, '완료할 할일');
    await user.click(screen.getByRole('button', { name: '할일 추가' }));

    // 체크박스 클릭
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // 완료 스타일 확인
    const title = screen.getByText('완료할 할일');
    expect(title).toHaveClass('line-through');
  });

  it('할일을 삭제할 수 있다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // 할일 추가
    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    await user.type(titleInput, '삭제할 할일');
    await user.click(screen.getByRole('button', { name: '할일 추가' }));

    // 삭제 버튼 클릭
    const deleteButton = screen.getByLabelText('삭제할 할일 삭제');
    await user.click(deleteButton);

    // 할일이 사라짐
    expect(screen.queryByText('삭제할 할일')).not.toBeInTheDocument();
    expect(screen.getByText('할일이 없습니다')).toBeInTheDocument();
  });

  it('여러 개의 할일을 관리할 수 있다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    // 3개 추가
    await user.type(titleInput, '할일 1');
    await user.click(addButton);
    await user.type(titleInput, '할일 2');
    await user.click(addButton);
    await user.type(titleInput, '할일 3');
    await user.click(addButton);

    expect(screen.getByText('할일 1')).toBeInTheDocument();
    expect(screen.getByText('할일 2')).toBeInTheDocument();
    expect(screen.getByText('할일 3')).toBeInTheDocument();
  });

  it('필터 탭이 표시된다', () => {
    render(<Home />);
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('진행중')).toBeInTheDocument();
    expect(screen.getByText('완료')).toBeInTheDocument();
  });

  it('카운터가 정확하게 표시된다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    // 할일 3개 추가
    await user.type(titleInput, '할일 1');
    await user.click(addButton);
    await user.type(titleInput, '할일 2');
    await user.click(addButton);
    await user.type(titleInput, '할일 3');
    await user.click(addButton);

    // 카운터 확인: 3개 중 0개 완료
    expect(screen.getByText('3개 중 0개 완료')).toBeInTheDocument();

    // 1개 완료 처리
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // 카운터 업데이트 확인: 3개 중 1개 완료
    expect(screen.getByText('3개 중 1개 완료')).toBeInTheDocument();

    // 1개 더 완료
    await user.click(checkboxes[1]);
    expect(screen.getByText('3개 중 2개 완료')).toBeInTheDocument();
  });

  it('진행중 필터가 완료되지 않은 할일만 표시한다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    // 할일 2개 추가
    await user.type(titleInput, '진행중 할일');
    await user.click(addButton);
    await user.type(titleInput, '완료될 할일');
    await user.click(addButton);

    // 두 번째로 추가한 할일(인덱스 0) 완료 처리
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // 진행중 필터 클릭
    await user.click(screen.getByText('진행중'));

    // 진행중 할일만 표시
    expect(screen.getByText('진행중 할일')).toBeInTheDocument();
    expect(screen.queryByText('완료될 할일')).not.toBeInTheDocument();
  });

  it('완료 필터가 완료된 할일만 표시한다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    // 할일 2개 추가
    await user.type(titleInput, '진행중 할일');
    await user.click(addButton);
    await user.type(titleInput, '완료될 할일');
    await user.click(addButton);

    // 두 번째로 추가한 할일(인덱스 0) 완료 처리
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // 완료 필터 클릭
    await user.click(screen.getByText('완료'));

    // 완료된 할일만 표시
    expect(screen.queryByText('진행중 할일')).not.toBeInTheDocument();
    expect(screen.getByText('완료될 할일')).toBeInTheDocument();
  });

  it('전체 필터가 모든 할일을 표시한다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText('할일을 입력하세요');
    const addButton = screen.getByRole('button', { name: '할일 추가' });

    // 할일 2개 추가
    await user.type(titleInput, '진행중 할일');
    await user.click(addButton);
    await user.type(titleInput, '완료될 할일');
    await user.click(addButton);

    // 두 번째로 추가한 할일(인덱스 0) 완료 처리
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // 진행중 필터로 이동 후 다시 전체로
    await user.click(screen.getByText('진행중'));
    await user.click(screen.getByText('전체'));

    // 모든 할일 표시
    expect(screen.getByText('진행중 할일')).toBeInTheDocument();
    expect(screen.getByText('완료될 할일')).toBeInTheDocument();
  });

  it('빈 목록에서 필터를 전환해도 에러가 발생하지 않는다', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // 빈 상태에서 필터 전환
    await user.click(screen.getByText('진행중'));
    expect(screen.getByText('할일이 없습니다')).toBeInTheDocument();

    await user.click(screen.getByText('완료'));
    expect(screen.getByText('할일이 없습니다')).toBeInTheDocument();

    await user.click(screen.getByText('전체'));
    expect(screen.getByText('할일이 없습니다')).toBeInTheDocument();
  });
});
