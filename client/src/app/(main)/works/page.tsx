'use client';

import { works } from '@/shared/data/works';
import { WorkList } from '@/widgets/work-list';

export default function WorksPage() {
  return (
    <div className="w-full">
      <WorkList works={works} />
    </div>
  );
}
