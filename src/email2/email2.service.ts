import { Inject, Injectable } from '@nestjs/common';

// propertyBase.testServiceA.ts
@Injectable()
export class TestServiceA {
  testHello() {
    return 'hello Test A';
  }
}

// propertyBase.parentService.ts

// parentService를 직접 참조하는 클래스가 없기 때문에 Injectable이 없어도 됩니다.
export class ParentService {
  // constructor(private readonly testServiceA: TestServiceA) {}
  @Inject(TestServiceA) private readonly testServiceA: TestServiceA;

  testHello(): string {
    return 'hello world';
  }

  parentTest(): string {
    return this.testServiceA.testHello();
  }
}
// // propertyBase.childService.ts
@Injectable()
export class ChildService extends ParentService {
  testHello(): string {
    return this.parentTest();
  }
}
