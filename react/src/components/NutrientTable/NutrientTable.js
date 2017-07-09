import React from 'react'
import PropTypes from 'prop-types'
import { Column, Cell } from 'fixed-data-table'
import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
import renderers from '../../modules/renderers'
import { LABELS, CUSTOMER_FIELDS, SERVICE_FIELDS } from '../../constants'

// Stateless cell components for Table component
function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey, ...props}) {
  const clickFunc = () => sortBy(columnKey)

  return (
    <Cell {...props}>
      <a onClick={clickFunc}>
        {children} {renderers.renderSortArrow(sortKey, sortDesc, columnKey)}
      </a>
    </Cell>
  )
}

SortHeaderCell.propTypes = {
  sortBy: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  columnKey: PropTypes.string,
  children: PropTypes.any
}

function DataCell ({data, rowIndex, columnKey, ...props}) {
  return <Cell {...props}> {data[rowIndex][columnKey]} </Cell>
}

DataCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string
}

class NutrientTable extends React.Component {
  componentWillMount () {
    this.props.fetchData()
  }

  handleFilterStringChange () {
    return (e) => {
      e.preventDefault()
      this.props.filterBy(e.target.value)
    }
  }

  doesMatch (str) {
    return (key) => (key + '').toLowerCase().indexOf(str) !== -1
  }

  filterData () {
    const {data, filterString} = this.props
    const str = filterString.toLowerCase()
    return str !== ''
      ? data.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : data
  }

  sortData () {
    const {data, sortKey, sortDesc} = this.props
    const multiplier = sortDesc ? -1 : 1
    const isUserField = CUSTOMER_FIELDS.indexOf(sortKey) >= 0
    data.sort((a, b) => {
      const aVal = (isUserField ? a['user'][sortKey] : a[sortKey]) || 0
      const bVal = (isUserField ? b['user'][sortKey] : b[sortKey]) || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }

  handleRowClick(event, index, data) {
     console.log( 'here is the event:',event,
               'the index:',index,
               'the object:',data[index]
    );
    this.props.editUser(data[index])
  }

  render () {
    const { isFetching, filterString, sortBy, sortKey, sortDesc } = this.props
    const headerCellProps = { sortBy, sortKey, sortDesc }
    console.log('props.data', this.props.data)
    const data = this.sortData().filterData()
    console.log('data', data)

    return (
      <div>
        <input className='filter-input' value={filterString}
          onChange={this.handleFilterStringChange()}
          type='text' placeholder='Filter Rows'
          autoCorrect='off' autoCapitalize='off' spellCheck='false' />
        <br />

        {isFetching && data.length === 0 &&
          <div className='loader-box' />}
        {!isFetching && data.length === 0 &&
          <h3 className='center'>No Matching Results :( </h3>}

        <ResponsiveTableWrapper
          onRowDoubleClick={ (event, index) => this.handleRowClick(event, index, data)}
          rowHeight={50}
          headerHeight={50}
          rowsCount={data.length}>
          {CUSTOMER_FIELDS.map(field => (<Column
            columnKey={field}
            header={<SortHeaderCell {...headerCellProps}> {field} </SortHeaderCell>}
            cell={({rowIndex, columnKey, width, height}) => (
              <Cell
                width={width}
                height={height}>
                { data[rowIndex]['user'][field]}
               </Cell>
            )}
            flexGrow={3}
            width={100} />))}
          {SERVICE_FIELDS.map(field => (<Column
            columnKey={field}
            header={<SortHeaderCell {...headerCellProps}> {field} </SortHeaderCell>}
            cell={<DataCell data={data} />}
            flexGrow={3}
            width={100} />))}
          
        </ResponsiveTableWrapper>
      </div>
    )
  }
}

NutrientTable.propTypes = {
  // actions
  fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,

  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default NutrientTable
