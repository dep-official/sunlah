'use client';

import { works } from '@/shared/data/works';
import { WorkList } from '@/widgets/work-list';

const AndMorePage = () => {
  return (
    <div className="w-full">
      <WorkList works={works} />
    </div>
  );
}
export default AndMorePage;