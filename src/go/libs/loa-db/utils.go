package loadb

import (
	"sync"

	"gorm.io/gorm/schema"
)

/**
 * 특정 테이블의 모든 컬럼명을 반환하는 함수
 *
 * Gorm에서는 구조체를 통해 Updates 메서드를 사용 시 zero-value가 아닌 항목에 한해서만 업데이트를 하기 때문에 명시적으로
 * 업데이트할 모든 필드를 기입해줘야 함.그렇지 않으면, false와 같은 boolean의 zero-value를 업데이트하지 않고, 기존 값으로
 * 남아있게 되어 버그가 발생할 수 있음. 그래서 이 함수를 통해 모델의 필드명을 반환하여 명시적으로 업데이트할 필드를 지정할 수 있음.
 */
func GetColumnNames(model interface{}, exclude ...string) []string {
	s, err := schema.Parse(model, &sync.Map{}, schema.NamingStrategy{
		SingularTable: true,
	})
	if err != nil {
		panic(err)
	}

	excludeMap := make(map[string]struct{}, len(exclude))
	for _, column := range exclude {
		excludeMap[column] = struct{}{}
	}

	columns := []string{}
	for _, field := range s.Fields {
		column := field.DBName
		if _, isExcluded := excludeMap[column]; !isExcluded {
			columns = append(columns, column)
		}
	}
	return columns
}
