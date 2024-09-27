'use client'
import Block from '@/components/shared/block';


export default function Dashboard() {
  return (
    <div className="grid grid-flow-col gap-4">
        <Block>
          <h3 className="text-center">Number Of Forms</h3>
          <div>
              50
          </div>
        </Block>
        <Block>
          <h3 className="text-center">Number Of Submissions</h3>
          <div>
              99
          </div>
        </Block>
        <Block>
          <h3 className="text-center">Number Of Submissions</h3>
          <div>
            99
          </div>
        </Block>
        <Block>
          <h3 className="text-center">Number Of Submissions</h3>
          <div>
            99
          </div>
        </Block>
    </div>
  );
}
